/**
 * Compact procedural value-noise / fbm used by the hero's custom shaders.
 * Kept dependency-free so it compiles in both WebGL1 and WebGL2 contexts.
 */
export const NOISE_GLSL = /* glsl */ `
  float heroHash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.11, 0.17, 0.13));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float heroNoise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(heroHash(i + vec3(0.0, 0.0, 0.0)), heroHash(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(heroHash(i + vec3(0.0, 1.0, 0.0)), heroHash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
      mix(mix(heroHash(i + vec3(0.0, 0.0, 1.0)), heroHash(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(heroHash(i + vec3(0.0, 1.0, 1.0)), heroHash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y),
      f.z);
  }

  float heroFbm(vec3 p) {
    float amp = 0.5;
    float sum = 0.0;
    for (int i = 0; i < 4; i++) {
      sum += amp * heroNoise(p);
      p *= 2.03;
      amp *= 0.5;
    }
    return sum;
  }
`;
