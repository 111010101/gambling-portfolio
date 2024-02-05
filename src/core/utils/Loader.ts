import { Assets, Texture } from 'pixi.js'
export async function load(): Promise<Texture[]> {
  const frames: Texture[] = [];
  await Assets.load('numbers.json').then(() => {
    for (let i = 0; i < 10; i++) {
      console.error(`${i}_TRANSPARENT.png`)
      const texture = Texture.from(`${i}_TRANSPARENT.png`)
      frames.push(texture);
    }
    const texture = Texture.from(`comma_TRANSPARENT.png`)
    frames.push(texture)
    if (frames.length === 0) {
      throw new Error(`resources are not loaded, function is called ${frames}`)
    }
  })
  return frames
}