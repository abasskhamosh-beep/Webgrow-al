import * as THREE from 'three';

/** Soft radial glow sprite used for bokeh particles, the sun burst and light spill. */
export function radialGlowTexture(inner = 'rgba(255,236,190,1)', outer = 'rgba(255,196,110,0)'): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.28, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Alpha-cut foliage cluster: many small pointed leaves drawn onto a transparent
 * canvas, used on crossed quads so canopies read as real leaves instead of solid blobs.
 */
export function foliageTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const greens = ['#2f5730', '#3f6b34', '#4f7d43', '#5f8f4b', '#6f9c55', '#84ac5b', '#96bd68'];
    const cx = size / 2;
    const cy = size / 2;
    for (let i = 0; i < 260; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.pow(Math.random(), 0.55) * (size * 0.45);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r * 0.92;
      const w = 6 + Math.random() * 13;
      const h = w * (0.4 + Math.random() * 0.45);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.random() * Math.PI * 2);
      ctx.fillStyle = greens[(Math.random() * greens.length) | 0];
      ctx.globalAlpha = 0.82 + Math.random() * 0.18;
      ctx.beginPath();
      ctx.moveTo(-w, 0);
      ctx.quadraticCurveTo(0, -h, w, 0);
      ctx.quadraticCurveTo(0, h, -w, 0);
      ctx.fill();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Unit-sized cluster of quads crossed around the Y axis — instanced per canopy
 * clump so foliage is billboarded from every viewing angle.
 */
export function crossedQuadsGeometry(planes = 3): THREE.BufferGeometry {
  const half = 0.5;
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  for (let p = 0; p < planes; p++) {
    const angle = (Math.PI / planes) * p;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const base = p * 4;
    const corners: [number, number][] = [
      [-half, -half],
      [half, -half],
      [half, half],
      [-half, half],
    ];
    corners.forEach(([lx, ly]) => {
      positions.push(lx * cos, ly, lx * sin);
      normals.push(0, 1, 0);
    });
    uvs.push(0, 0, 1, 0, 1, 1, 0, 1);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  return geo;
}

/** Speckled organic texture for the orchard ground. */
export function speckleTexture(base: string, spots: string[], count = 2400): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < count; i++) {
      const r = 1 + Math.random() * 4;
      ctx.globalAlpha = 0.18 + Math.random() * 0.4;
      ctx.fillStyle = spots[i % spots.length];
      ctx.beginPath();
      ctx.arc(Math.random() * size, Math.random() * size, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(38, 48);
  return tex;
}

/**
 * Procedural sky/ground gradient baked into a pre-filtered environment map.
 * Gives the orchard's PBR materials soft image-based lighting and reflections
 * instead of flat direct lighting, which is what makes surfaces read as real.
 */
export interface EnvironmentMap {
  texture: THREE.Texture;
  dispose: () => void;
}

export function environmentTexture(renderer: THREE.WebGLRenderer): EnvironmentMap {
  const w = 512;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0.0, '#bcd6ea');
    sky.addColorStop(0.34, '#e8ecd4');
    sky.addColorStop(0.46, '#ffe9bd');
    sky.addColorStop(0.54, '#e4dcae');
    sky.addColorStop(0.66, '#9aa860');
    sky.addColorStop(1.0, '#5d5735');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    const sun = ctx.createRadialGradient(w * 0.5, h * 0.44, 0, w * 0.5, h * 0.44, h * 0.34);
    sun.addColorStop(0.0, 'rgba(255,248,224,1)');
    sun.addColorStop(0.3, 'rgba(255,220,150,0.6)');
    sun.addColorStop(1.0, 'rgba(255,206,128,0)');
    ctx.fillStyle = sun;
    ctx.fillRect(0, 0, w, h);
  }

  const source = new THREE.CanvasTexture(canvas);
  source.mapping = THREE.EquirectangularReflectionMapping;
  source.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const target = pmrem.fromEquirectangular(source);
  source.dispose();
  pmrem.dispose();

  return {
    texture: target.texture,
    dispose: () => target.dispose(),
  };
}
