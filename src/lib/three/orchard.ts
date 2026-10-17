import * as THREE from 'three';
import { COLORS } from './palette';
import { crossedQuadsGeometry, foliageTexture, radialGlowTexture, speckleTexture } from './textures';
import type { ScenePart } from './orange';

type Disposable = THREE.BufferGeometry | THREE.Material | THREE.Texture;

const GROUND_Y = -8;
const ROWS = 13;
const COLS = 6;

/** Sunlit citrus orchard revealed after the camera leaves the fruit. */
export function buildOrchard(quality: 'high' | 'low'): ScenePart {
  const group = new THREE.Group();
  const disposables: Disposable[] = [];
  const high = quality === 'high';
  const windUniform = { value: 0 };

  // ---------------------------------------------------------------- sky dome
  const skyGeo = new THREE.SphereGeometry(420, 32, 24);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      uHorizon: { value: COLORS.hazeGreen.clone() },
      uZenith: { value: COLORS.skyGold.clone() },
      uGround: { value: COLORS.grass.clone() },
      uSunDir: { value: new THREE.Vector3(0.32, 0.3, -0.9).normalize() },
      uSunColor: { value: COLORS.glowWarm.clone() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uHorizon;
      uniform vec3 uZenith;
      uniform vec3 uGround;
      uniform vec3 uSunDir;
      uniform vec3 uSunColor;
      varying vec3 vDir;
      void main() {
        vec3 dir = normalize(vDir);
        vec3 col = mix(uHorizon, uZenith, smoothstep(-0.02, 0.6, dir.y));
        col = mix(uGround, col, smoothstep(-0.4, 0.0, dir.y));
        float sun = max(dot(dir, normalize(uSunDir)), 0.0);
        col += uSunColor * pow(sun, 90.0) * 1.4;
        col += uSunColor * pow(sun, 7.0) * 0.28;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  sky.position.z = -150;
  sky.renderOrder = -1000;
  group.add(sky);
  disposables.push(skyGeo, skyMat);

  // ---------------------------------------------------------------- ground
  const groundTex = speckleTexture('#7f7047', ['#8e7c4f', '#6d5f3b', '#93a05a'], high ? 3000 : 1200);
  const groundGeo = new THREE.PlaneGeometry(700, 900, 1, 1);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: groundTex,
    roughness: 1,
    metalness: 0,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, GROUND_Y, -220);
  group.add(ground);
  disposables.push(groundGeo, groundMat, groundTex);

  // ---------------------------------------------------------------- tree placement
  const trees: { x: number; z: number; scale: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const jitterX = (Math.random() - 0.5) * 5;
      const jitterZ = (Math.random() - 0.5) * 6;
      trees.push({
        x: (c - (COLS - 1) / 2) * 23 + jitterX,
        z: -80 - r * 25 + jitterZ,
        scale: 0.85 + Math.random() * 0.5,
      });
    }
  }

  const dummy = new THREE.Object3D();

  // ---------------------------------------------------------------- trunks
  const trunkGeo = new THREE.CylinderGeometry(0.32, 0.6, 9, 6);
  const trunkMat = new THREE.MeshStandardMaterial({ color: COLORS.trunk, roughness: 0.92, metalness: 0 });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, trees.length);
  trees.forEach((tree, i) => {
    dummy.position.set(tree.x, GROUND_Y + 4.5 * tree.scale, tree.z);
    dummy.rotation.set(0, Math.random() * Math.PI, (Math.random() - 0.5) * 0.06);
    dummy.scale.set(tree.scale, tree.scale, tree.scale);
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);
  });
  trunks.instanceMatrix.needsUpdate = true;
  group.add(trunks);
  disposables.push(trunkGeo, trunkMat);

  // ---------------------------------------------------------------- foliage
  const clustersPerTree = high ? 8 : 5;
  const blobGeo = crossedQuadsGeometry(3);
  const foliageTex = foliageTexture();
  const blobMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: foliageTex,
    alphaTest: 0.45,
    side: THREE.DoubleSide,
    roughness: 0.95,
    metalness: 0,
    emissive: new THREE.Color('#16220f'),
    emissiveIntensity: 0.75,
  });
  const foliage = new THREE.InstancedMesh(blobGeo, blobMat, trees.length * clustersPerTree);
  // Near-white tints: these multiply the leaf texture's own greens.
  const leafTints = [
    new THREE.Color('#ffffff'),
    new THREE.Color('#dcecc6'),
    new THREE.Color('#aecb90'),
    new THREE.Color('#ffe9b8'),
    new THREE.Color('#c6dcaa'),
  ];
  let fi = 0;
  trees.forEach((tree) => {
    for (let b = 0; b < clustersPerTree; b++) {
      const spread = 2.6 * tree.scale;
      const size = (3.6 + Math.random() * 1.8) * tree.scale;
      dummy.position.set(
        tree.x + (Math.random() - 0.5) * spread * 2,
        GROUND_Y + (5.6 + Math.random() * 3.4) * tree.scale,
        tree.z + (Math.random() - 0.5) * spread * 2
      );
      dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
      dummy.scale.set(size, size * (0.85 + Math.random() * 0.3), size);
      dummy.updateMatrix();
      foliage.setMatrixAt(fi, dummy.matrix);
      foliage.setColorAt(fi, leafTints[fi % leafTints.length]);
      fi++;
    }
  });
  foliage.instanceMatrix.needsUpdate = true;
  if (foliage.instanceColor) foliage.instanceColor.needsUpdate = true;
  group.add(foliage);
  disposables.push(blobGeo, blobMat, foliageTex);

  // Gentle breeze — injected into the instanced foliage vertex shader.
  blobMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = windUniform;
    shader.vertexShader = 'uniform float uTime;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      #ifdef USE_INSTANCING
        vec3 iPos = instanceMatrix[3].xyz;
        float swayA = sin(uTime * 0.9 + iPos.x * 0.25 + iPos.z * 0.18);
        float swayB = cos(uTime * 0.7 + iPos.z * 0.3);
        float h = clamp((transformed.y + 1.0) * 0.45, 0.0, 1.4);
        transformed.x += swayA * 0.16 * h;
        transformed.z += swayB * 0.13 * h;
      #endif`
    );
  };

  // ---------------------------------------------------------------- fruits
  const fruitsPerTree = high ? 4 : 2;
  const fruitGeo = new THREE.SphereGeometry(0.36, 12, 12);
  const fruitMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.05 });
  const fruits = new THREE.InstancedMesh(fruitGeo, fruitMat, trees.length * fruitsPerTree);
  let fui = 0;
  trees.forEach((tree) => {
    for (let f = 0; f < fruitsPerTree; f++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = (2.6 + Math.random() * 1.6) * tree.scale;
      dummy.position.set(
        tree.x + Math.cos(angle) * radius,
        GROUND_Y + (5.2 + Math.random() * 3.2) * tree.scale,
        tree.z + Math.sin(angle) * radius
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar((0.85 + Math.random() * 0.5) * tree.scale);
      dummy.updateMatrix();
      fruits.setMatrixAt(fui, dummy.matrix);
      fruits.setColorAt(fui, Math.random() > 0.28 ? COLORS.fruit : COLORS.fruitGreen);
      fui++;
    }
  });
  fruits.instanceMatrix.needsUpdate = true;
  if (fruits.instanceColor) fruits.instanceColor.needsUpdate = true;
  group.add(fruits);
  disposables.push(fruitGeo, fruitMat);

  // ---------------------------------------------------------------- ground shrubs
  const shrubCount = high ? 240 : 90;
  const shrubGeo = crossedQuadsGeometry(2);
  const shrubMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: foliageTex,
    alphaTest: 0.45,
    side: THREE.DoubleSide,
    roughness: 0.95,
    metalness: 0,
    emissive: new THREE.Color('#16220f'),
    emissiveIntensity: 0.7,
  });
  const shrubs = new THREE.InstancedMesh(shrubGeo, shrubMat, shrubCount);
  for (let i = 0; i < shrubCount; i++) {
    const s = 0.9 + Math.random() * 1.8;
    dummy.position.set((Math.random() - 0.5) * 150, GROUND_Y + s * 0.5, -95 - Math.random() * 305);
    dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
    dummy.scale.set(s, s, s);
    dummy.updateMatrix();
    shrubs.setMatrixAt(i, dummy.matrix);
    shrubs.setColorAt(i, leafTints[i % leafTints.length]);
  }
  shrubs.instanceMatrix.needsUpdate = true;
  if (shrubs.instanceColor) shrubs.instanceColor.needsUpdate = true;
  group.add(shrubs);
  disposables.push(shrubGeo, shrubMat);

  // ---------------------------------------------------------------- sun glow
  const sunTex = radialGlowTexture('rgba(255,246,220,1)', 'rgba(255,206,128,0)');
  const sunMat = new THREE.SpriteMaterial({
    map: sunTex,
    color: COLORS.glowWarm,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
    opacity: 0.5,
  });
  const sun = new THREE.Sprite(sunMat);
  sun.position.set(150, 120, -350);
  sun.scale.set(150, 150, 1);
  group.add(sun);
  disposables.push(sunTex, sunMat);

  const update = (time: number) => {
    windUniform.value = time;
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
    foliage.dispose();
    trunks.dispose();
    fruits.dispose();
    shrubs.dispose();
  };

  return { object: group, update, dispose };
}
