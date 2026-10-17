import * as THREE from 'three';

/** Shared colour palette for the cinematic hero (inside the orange → orchard). */
export const COLORS = {
  // Orange interior
  pulpDeep: new THREE.Color('#8f3c0a'),
  pulpMid: new THREE.Color('#e0761f'),
  pulpBright: new THREE.Color('#ffb64a'),
  membrane: new THREE.Color('#f6c06a'),
  juice: new THREE.Color('#ffd08a'),
  peelOuter: new THREE.Color('#e2701f'),
  peelInner: new THREE.Color('#f8cf82'),
  glowWarm: new THREE.Color('#ffdca0'),

  // Orchard
  leaf: new THREE.Color('#4f7d43'),
  leafLight: new THREE.Color('#84ac5b'),
  leafDark: new THREE.Color('#2d5730'),
  leafPale: new THREE.Color('#a8c273'),
  fruit: new THREE.Color('#ef8a1e'),
  fruitGreen: new THREE.Color('#9cb63c'),
  trunk: new THREE.Color('#6a4c31'),
  soil: new THREE.Color('#7f7047'),
  grass: new THREE.Color('#8ba05a'),

  // Atmosphere
  hazeGreen: new THREE.Color('#d6e3ba'),
  skyGold: new THREE.Color('#ffe4b0'),
  skyZenith: new THREE.Color('#bfd6e8'),
} as const;
