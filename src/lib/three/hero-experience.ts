import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COLORS } from './palette';
import { buildOrange, type ScenePart } from './orange';
import { buildOrchard } from './orchard';
import { environmentTexture } from './textures';

gsap.registerPlugin(ScrollTrigger);

export interface HeroExperienceOptions {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  quality: 'high' | 'low';
  onReady?: () => void;
  onProgress?: (progress: number) => void;
}

/** Scroll keyframes for the single continuous camera shot. */
const CAM = {
  p: [0, 0.42, 0.56, 0.78, 1],
  z: [10, -52, -80, -142, -206],
  y: [0, 1.5, 2.5, 4, 5.5],
  x: [0, 1.5, 0.5, -2, 0],
  fov: [62, 60, 68, 60, 58],
  lookY: [0, 1, 2, 3.5, 4.5],
  roll: [0, 0.03, 0, -0.02, 0],
};

const FOG_P = [0, 0.42, 0.56, 0.75, 1];
const FOG_COLOR = ['#8a4415', '#b06018', '#ffd08a', '#dfe8c2', '#d3e2b6'];
const FOG_DENSITY = [0.036, 0.03, 0.022, 0.014, 0.009];

/** Progress at which the orchard becomes visible (hidden behind the opaque rind). */
const ORCHARD_REVEAL_AT = 0.5;

/** Fixed sun direction (matches the sky shader's disc) used by the moving shadow camera. */
const SUN_OFFSET = new THREE.Vector3(60, 70, 90).normalize();

const SUN = { p: [0, 0.45, 0.6, 1], v: [0, 0.1, 2.6, 2.0] };
const AMBIENT = { p: [0, 0.45, 0.6, 1], v: [0.65, 0.5, 1.15, 1.05] };
const WARM = { p: [0, 0.4, 0.58, 1], v: [1.6, 1.3, 0.15, 0] };

function piecewise(p: number, ps: number[], vs: number[]): number {
  if (p <= ps[0]) return vs[0];
  for (let i = 0; i < ps.length - 1; i++) {
    if (p <= ps[i + 1]) {
      const t = THREE.MathUtils.smoothstep(p, ps[i], ps[i + 1]);
      return THREE.MathUtils.lerp(vs[i], vs[i + 1], t);
    }
  }
  return vs[vs.length - 1];
}

const fogColors = FOG_COLOR.map((c) => new THREE.Color(c));
const tmpColor = new THREE.Color();

function piecewiseColor(p: number, target: THREE.Color): THREE.Color {
  if (p <= FOG_P[0]) return target.copy(fogColors[0]);
  for (let i = 0; i < FOG_P.length - 1; i++) {
    if (p <= FOG_P[i + 1]) {
      const t = THREE.MathUtils.smoothstep(p, FOG_P[i], FOG_P[i + 1]);
      return target.copy(fogColors[i]).lerp(fogColors[i + 1], t);
    }
  }
  return target.copy(fogColors[fogColors.length - 1]);
}

/**
 * Orchestrates the renderer, camera, lighting and scroll-driven timeline for the
 * "inside a Thomson orange → citrus orchard" single-shot hero.
 */
export class HeroExperience {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly orange: ScenePart;
  private readonly orchard: ScenePart;
  private readonly fog: THREE.FogExp2;
  private readonly ambient: THREE.AmbientLight;
  private readonly sun: THREE.DirectionalLight;
  private readonly warmA: THREE.PointLight;
  private readonly warmB: THREE.PointLight;
  private readonly clock = new THREE.Clock();
  private readonly resizeObserver: ResizeObserver;
  private readonly environment: { texture: THREE.Texture; dispose: () => void };
  private readonly sunFocus = new THREE.Vector3();
  private trigger?: ScrollTrigger;

  private progress = 0;
  private targetProgress = 0;
  private lastFov = -1;
  private raf = 0;
  private running = true;
  private ready = false;
  private disposed = false;

  constructor(private readonly options: HeroExperienceOptions) {
    const { canvas, container, quality } = options;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: quality === 'high',
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality === 'high' ? 2 : 1.5));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.14;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.fog = new THREE.FogExp2(new THREE.Color(FOG_COLOR[0]), FOG_DENSITY[0]);
    this.scene.fog = this.fog;

    // Image-based lighting so the PBR materials (bark, fruit, juice) read as real
    // surfaces with soft ambient bounce instead of flat direct lighting.
    this.environment = environmentTexture(this.renderer);
    this.scene.environment = this.environment.texture;
    this.scene.environmentIntensity = 0.45;

    this.camera = new THREE.PerspectiveCamera(CAM.fov[0], 1, 0.1, 1200);
    this.camera.position.set(0, 0, 10);

    this.ambient = new THREE.AmbientLight(0xffc98a, AMBIENT.v[0]);
    this.scene.add(this.ambient);

    this.sun = new THREE.DirectionalLight(0xfff0cc, 0);
    this.sun.position.set(60, 70, -140);
    this.sun.target.position.set(0, 0, -230);
    this.sun.castShadow = true;
    const shadowSize = quality === 'high' ? 2048 : 1024;
    this.sun.shadow.mapSize.set(shadowSize, shadowSize);
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.5;
    const shadowCam = this.sun.shadow.camera;
    shadowCam.left = -90;
    shadowCam.right = 90;
    shadowCam.top = 90;
    shadowCam.bottom = -90;
    shadowCam.near = 1;
    shadowCam.far = 560;
    shadowCam.updateProjectionMatrix();
    this.scene.add(this.sun);
    this.scene.add(this.sun.target);

    this.warmA = new THREE.PointLight(0xffb060, 0, 120, 2);
    this.warmA.position.set(6, 5, -18);
    this.scene.add(this.warmA);

    this.warmB = new THREE.PointLight(0xffa54a, 0, 120, 2);
    this.warmB.position.set(-7, -4, -44);
    this.scene.add(this.warmB);

    this.orange = buildOrange(quality);
    this.orchard = buildOrchard(quality);
    this.scene.add(this.orange.object);
    this.scene.add(this.orchard.object);

    // Warm up the orchard's shaders now so revealing it mid-journey never hitches.
    this.renderer.compile(this.scene, this.camera);
    this.orchard.object.visible = false;

    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);

    this.trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        this.targetProgress = self.progress;
      },
      onRefresh: (self) => {
        this.targetProgress = self.progress;
      },
    });

    this.options.onProgress?.(0);
    this.tick();
  }

  private resize = () => {
    // Size to the sticky viewport the canvas actually occupies (not the tall scroll container).
    const canvas = this.options.canvas;
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  private tick = () => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.tick);

    const dt = Math.min(this.clock.getDelta(), 0.1);
    const time = this.clock.elapsedTime;

    // Smoothly ease toward the scroll-driven target for cinematic damping.
    const smoothing = 1 - Math.pow(0.001, dt);
    this.progress += (this.targetProgress - this.progress) * smoothing;
    if (Math.abs(this.targetProgress - this.progress) < 0.0004) this.progress = this.targetProgress;

    const p = this.progress;

    // ------------------------------------------------------------- camera path
    const z = piecewise(p, CAM.p, CAM.z);
    const baseY = piecewise(p, CAM.p, CAM.y);
    const baseX = piecewise(p, CAM.p, CAM.x);
    const fov = piecewise(p, CAM.p, CAM.fov);
    const lookY = piecewise(p, CAM.p, CAM.lookY);
    const roll = piecewise(p, CAM.p, CAM.roll);

    const sway = 1 - p * 0.55;
    const camX = baseX + Math.sin(time * 0.33) * 0.55 * sway;
    const camY = baseY + Math.cos(time * 0.27) * 0.4 * sway;

    this.camera.position.set(camX, camY, z);
    this.camera.lookAt(camX * 0.35, lookY, z - 40);
    this.camera.rotateZ(roll + Math.sin(time * 0.19) * 0.008 * sway);

    if (Math.abs(fov - this.lastFov) > 0.02) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
      this.lastFov = fov;
    }

    // ------------------------------------------------------------- shadow follow
    // Keep the shadow camera centred ahead of the camera so near trees stay crisp
    // along the whole journey without a giant, low-resolution shadow frustum.
    this.sunFocus.set(camX * 0.5, 0, z - 70);
    this.sun.target.position.copy(this.sunFocus);
    this.sun.position.copy(this.sunFocus).addScaledVector(SUN_OFFSET, 220);

    // ------------------------------------------------------------- atmosphere
    piecewiseColor(p, tmpColor);
    this.fog.color.copy(tmpColor);
    this.fog.density = piecewise(p, FOG_P, FOG_DENSITY);

    // ------------------------------------------------------------- lighting
    this.sun.intensity = piecewise(p, SUN.p, SUN.v);
    this.ambient.intensity = piecewise(p, AMBIENT.p, AMBIENT.v);
    this.ambient.color.setRGB(
      THREE.MathUtils.lerp(1.0, 0.86, p),
      THREE.MathUtils.lerp(0.79, 0.92, p),
      THREE.MathUtils.lerp(0.54, 0.74, p)
    );
    const warmIntensity = piecewise(p, WARM.p, WARM.v);
    this.warmA.intensity = warmIntensity;
    this.warmB.intensity = warmIntensity * 0.85;

    // ------------------------------------------------------------- scene parts
    // The orchard stays hidden until the camera is fully enclosed by the opaque
    // rind — otherwise the ground and near trees show through the tunnel mouth.
    this.orchard.object.visible = p >= ORCHARD_REVEAL_AT;
    this.orange.update(time, p);
    this.orchard.update(time);

    this.renderer.render(this.scene, this.camera);

    if (!this.ready) {
      this.ready = true;
      this.options.onReady?.();
    }

    if (this.running) this.options.onProgress?.(p);
  };

  /** Pause rendering (used when the hero scrolls fully out of view). */
  setRunning(running: boolean) {
    this.running = running;
    if (running) this.clock.getDelta();
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.trigger?.kill();
    this.trigger = undefined;
    this.resizeObserver.disconnect();
    this.orange.dispose();
    this.orchard.dispose();
    this.environment.dispose();
    this.renderer.dispose();
  }
}
