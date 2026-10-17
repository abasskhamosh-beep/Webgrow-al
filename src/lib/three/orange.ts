import * as THREE from 'three';
import { COLORS } from './palette';
import { NOISE_GLSL } from './glsl';
import { radialGlowTexture } from './textures';

export interface ScenePart {
  object: THREE.Object3D;
  update: (time: number, progress: number) => void;
  dispose: () => void;
}

/** Camera flies from z = TUNNEL_NEAR down to TUNNEL_FAR inside the pulp tunnel. */
const TUNNEL_NEAR = 12;
const TUNNEL_FAR = -70;
const TUNNEL_RADIUS_NEAR = 17;
const TUNNEL_RADIUS_FAR = 13.5;
const PEEL_Z = -76;

type Disposable = THREE.BufferGeometry | THREE.Material | THREE.Texture;

/** Rich, translucent orange pulp lining the tunnel. */
function makePulpMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    side: THREE.BackSide,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0 },
        uDeep: { value: COLORS.pulpDeep.clone() },
        uMid: { value: COLORS.pulpMid.clone() },
        uBright: { value: COLORS.pulpBright.clone() },
        uGlow: { value: 0.3 },
      },
    ]),
    vertexShader: /* glsl */ `
      #include <fog_pars_vertex>
      varying vec3 vWorld;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorld = worldPos.xyz;
        vec4 mvPosition = viewMatrix * worldPos;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: /* glsl */ `
      #include <fog_pars_fragment>
      uniform float uTime;
      uniform vec3 uDeep;
      uniform vec3 uMid;
      uniform vec3 uBright;
      uniform float uGlow;
      varying vec3 vWorld;
      ${NOISE_GLSL}
      void main() {
        vec3 p = vWorld * 0.09;
        float n = heroFbm(p + vec3(0.0, uTime * 0.035, uTime * 0.02));
        float n2 = heroFbm(p * 2.6 + vec3(uTime * 0.045, 0.0, 0.0));
        vec3 col = mix(uDeep, uMid, smoothstep(0.14, 0.74, n));
        col = mix(col, uBright, smoothstep(0.5, 0.95, n2) * 0.85);
        float vein = smoothstep(0.45, 0.5, abs(n - 0.5) * 2.0);
        col *= 0.8 + 0.34 * vein;
        col += uBright * uGlow * smoothstep(0.62, 1.0, n2);
        gl_FragColor = vec4(col, 1.0);
        #include <fog_fragment>
      }
    `,
  });
}

/** Slightly translucent, bumpy outer rind the camera breaks through. */
function makePeelMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uTime: { value: 0 },
        uOpacity: { value: 1 },
        uOuter: { value: COLORS.peelOuter.clone() },
        uInner: { value: COLORS.peelInner.clone() },
      },
    ]),
    vertexShader: /* glsl */ `
      #include <fog_pars_vertex>
      varying vec3 vWorld;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorld = worldPos.xyz;
        vec4 mvPosition = viewMatrix * worldPos;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: /* glsl */ `
      #include <fog_pars_fragment>
      uniform float uTime;
      uniform float uOpacity;
      uniform vec3 uOuter;
      uniform vec3 uInner;
      varying vec3 vWorld;
      ${NOISE_GLSL}
      void main() {
        vec3 p = vWorld * 0.42;
        float n = heroFbm(p + vec3(uTime * 0.02));
        float n2 = heroFbm(p * 3.1);
        vec3 col = mix(uOuter, uInner, smoothstep(0.3, 0.85, n));
        col = mix(col, uInner, smoothstep(0.62, 1.0, n2) * 0.55);
        // Fully opaque while sealing the pulp chamber; the rind's translucency
        // appears only as it dissolves during the breakthrough.
        float alpha = uOpacity;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(col, alpha);
        #include <fog_fragment>
      }
    `,
  });
}

export function buildOrange(quality: 'high' | 'low'): ScenePart {
  const group = new THREE.Group();
  const disposables: Disposable[] = [];
  const high = quality === 'high';
  const length = TUNNEL_NEAR - TUNNEL_FAR;

  // ---------------------------------------------------------------- pulp tunnel
  const tunnelGeo = new THREE.CylinderGeometry(
    TUNNEL_RADIUS_NEAR,
    TUNNEL_RADIUS_FAR,
    length,
    high ? 72 : 36,
    high ? 40 : 16,
    true
  );
  tunnelGeo.rotateX(Math.PI / 2);
  const pulpMat = makePulpMaterial();
  const tunnel = new THREE.Mesh(tunnelGeo, pulpMat);
  tunnel.position.z = (TUNNEL_NEAR + TUNNEL_FAR) / 2;
  group.add(tunnel);
  disposables.push(tunnelGeo, pulpMat);

  // ---------------------------------------------------------------- juice vesicles
  const vesCount = high ? 1100 : 380;
  const vesGeo = new THREE.SphereGeometry(0.5, 8, 8);
  const vesMat = new THREE.MeshStandardMaterial({
    color: COLORS.pulpBright,
    emissive: COLORS.pulpMid,
    emissiveIntensity: 0.5,
    roughness: 0.26,
    metalness: 0.04,
    transparent: true,
    opacity: 0.95,
  });
  const vesicles = new THREE.InstancedMesh(vesGeo, vesMat, vesCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < vesCount; i++) {
    const t = Math.random();
    const z = TUNNEL_NEAR - t * length;
    const radius = THREE.MathUtils.lerp(TUNNEL_RADIUS_NEAR, TUNNEL_RADIUS_FAR, t) * (0.74 + Math.random() * 0.24);
    const angle = Math.random() * Math.PI * 2;
    dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, z);
    dummy.lookAt(0, 0, z);
    dummy.rotateY(Math.random() * Math.PI);
    const s = 0.6 + Math.random() * 1.15;
    dummy.scale.set(s * 0.72, s * 0.72, s * 2.3);
    dummy.updateMatrix();
    vesicles.setMatrixAt(i, dummy.matrix);
  }
  vesicles.instanceMatrix.needsUpdate = true;
  group.add(vesicles);
  disposables.push(vesGeo, vesMat);

  // ---------------------------------------------------------------- membranes
  const membraneMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: true,
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      { uTime: { value: 0 }, uColor: { value: COLORS.membrane.clone() } },
    ]),
    vertexShader: /* glsl */ `
      #include <fog_pars_vertex>
      varying vec2 vUv;
      varying vec3 vWorld;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorld = worldPos.xyz;
        vec4 mvPosition = viewMatrix * worldPos;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: /* glsl */ `
      #include <fog_pars_fragment>
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vWorld;
      ${NOISE_GLSL}
      void main() {
        float n = heroFbm(vWorld * 0.16 + vec3(0.0, uTime * 0.03, 0.0));
        float mask = smoothstep(0.38, 0.72, n);
        float edge = 1.0 - smoothstep(0.28, 0.5, distance(vUv, vec2(0.5)));
        float alpha = mask * edge * 0.42;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(uColor, alpha);
        #include <fog_fragment>
      }
    `,
  });
  const membranes: THREE.Mesh[] = [];
  const membraneZ = [-8, -24, -40, -56];
  membraneZ.forEach((z, i) => {
    const geo = new THREE.PlaneGeometry(34, 34, 1, 1);
    const mesh = new THREE.Mesh(geo, membraneMat);
    mesh.position.set(0, 0, z);
    mesh.rotation.set(0.2 * (i % 2 ? 1 : -1), 0.35 * i, 0.15 * i);
    mesh.renderOrder = 1;
    group.add(mesh);
    membranes.push(mesh);
    disposables.push(geo);
  });
  disposables.push(membraneMat);

  // ---------------------------------------------------------------- juice droplets
  const dropCount = high ? 150 : 55;
  const dropGeo = new THREE.SphereGeometry(0.17, 10, 10);
  const dropMat = new THREE.MeshStandardMaterial({
    color: COLORS.juice,
    emissive: COLORS.glowWarm,
    emissiveIntensity: 0.7,
    roughness: 0.04,
    metalness: 0.15,
    transparent: true,
    opacity: 0.92,
  });
  const droplets = new THREE.InstancedMesh(dropGeo, dropMat, dropCount);
  const dropSeeds: number[] = [];
  for (let i = 0; i < dropCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2 + Math.random() * 8;
    dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, TUNNEL_NEAR - Math.random() * length);
    const s = 0.5 + Math.random() * 1.4;
    dummy.scale.setScalar(s);
    dummy.rotation.set(0, 0, 0);
    dummy.updateMatrix();
    droplets.setMatrixAt(i, dummy.matrix);
    dropSeeds.push(Math.random() * Math.PI * 2);
  }
  droplets.instanceMatrix.needsUpdate = true;
  group.add(droplets);
  disposables.push(dropGeo, dropMat);

  // ---------------------------------------------------------------- bokeh particles
  const glowTex = radialGlowTexture();
  const pCount = high ? 420 : 160;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  const pSize = new Float32Array(pCount);
  for (let i = 0; i < pCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.5 + Math.random() * 12;
    pPos[i * 3] = Math.cos(angle) * radius;
    pPos[i * 3 + 1] = Math.sin(angle) * radius;
    pPos[i * 3 + 2] = TUNNEL_NEAR - Math.random() * length;
    pSize[i] = 0.6 + Math.random() * 2.4;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1));
  const pMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uTex: { value: glowTex }, uOpacity: { value: 0.5 } },
    vertexShader: /* glsl */ `
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 pos = position;
        pos.x += sin(uTime * 0.25 + position.z * 0.2) * 0.5;
        pos.y += cos(uTime * 0.21 + position.x * 0.3) * 0.5;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
        vAlpha = smoothstep(0.0, 6.0, -mvPosition.z);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform sampler2D uTex;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        vec4 tex = texture2D(uTex, gl_PointCoord);
        gl_FragColor = vec4(tex.rgb, tex.a * uOpacity * vAlpha);
      }
    `,
  });
  const particles = new THREE.Points(pGeo, pMat);
  particles.renderOrder = 3;
  group.add(particles);
  disposables.push(pGeo, pMat, glowTex);

  // ---------------------------------------------------------------- peel shell
  // Large enough to seal the tunnel's far opening across the whole frame, so the
  // orchard never leaks into the pulp before the camera breaks through the rind.
  const peelGeo = new THREE.SphereGeometry(23, high ? 56 : 28, high ? 36 : 18);
  const peelMat = makePeelMaterial();
  const peel = new THREE.Mesh(peelGeo, peelMat);
  peel.position.z = PEEL_Z;
  peel.renderOrder = 2;
  group.add(peel);
  disposables.push(peelGeo, peelMat);

  // ---------------------------------------------------------------- golden burst
  const burstTex = radialGlowTexture('rgba(255,244,214,1)', 'rgba(255,206,128,0)');
  const burstMat = new THREE.SpriteMaterial({
    map: burstTex,
    color: COLORS.glowWarm,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: false,
    opacity: 0,
  });
  const burst = new THREE.Sprite(burstMat);
  burst.position.set(0, 0, PEEL_Z - 24);
  group.add(burst);
  disposables.push(burstTex, burstMat);

  const update = (time: number, progress: number) => {
    pulpMat.uniforms.uTime.value = time;
    membraneMat.uniforms.uTime.value = time;
    peelMat.uniforms.uTime.value = time;
    pMat.uniforms.uTime.value = time;

    // The rind seals the far end of the pulp chamber, then dissolves as we break through.
    const peelFade = 1 - THREE.MathUtils.smoothstep(progress, 0.52, 0.64);
    peelMat.uniforms.uOpacity.value = 0.95 * peelFade;

    // Golden light burst as the camera breaks through.
    const burstAmount = Math.max(0, 1 - Math.abs(progress - 0.565) / 0.09);
    burstMat.opacity = burstAmount * 0.75;
    const burstScale = 22 + burstAmount * 46;
    burst.scale.set(burstScale, burstScale, 1);

    // Droplets drift through the pulp and wrap around.
    for (let i = 0; i < dropCount; i++) {
      const seed = dropSeeds[i];
      const z = TUNNEL_NEAR - ((time * (1.4 + (i % 5) * 0.3) + seed * 20) % length);
      const angle = seed + time * 0.08;
      const radius = 2 + ((i * 37) % 80) / 10;
      dummy.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius + Math.sin(time * 0.6 + seed) * 0.4, z);
      dummy.scale.setScalar(0.5 + (i % 7) * 0.16);
      dummy.updateMatrix();
      droplets.setMatrixAt(i, dummy.matrix);
    }
    droplets.instanceMatrix.needsUpdate = true;

    // Membranes gently drift.
    membranes.forEach((mesh, i) => {
      mesh.position.x = Math.sin(time * 0.12 + i) * 1.6;
      mesh.position.y = Math.cos(time * 0.1 + i * 1.7) * 1.2;
    });
  };

  const dispose = () => {
    disposables.forEach((d) => d.dispose());
    vesicles.dispose();
    droplets.dispose();
  };

  return { object: group, update, dispose };
}
