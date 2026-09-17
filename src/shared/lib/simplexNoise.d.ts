export interface SimplexNoise {
  noise2D(x: number, y: number): number
  noise3D(x: number, y: number, z: number): number
  noise4D(x: number, y: number, z: number, w: number): number
}

export interface SimplexNoiseConstructor {
  new (seed?: number | string | (() => number)): SimplexNoise
}

declare const SimplexNoise: SimplexNoiseConstructor
export default SimplexNoise
