import { Types } from '../types/types';
import { TRANSPARENT_SYMBOL_BIAS_LANDSCAPE } from '../constants/constants';
type TextureName = Types.TextureName
type ReelSymbolData = Types.ReelSymbolData
type TransparentTexture = Types.FoundedTransparentTexture
export function compareImageReducer(acc: TransparentTexture, nextTexture: TextureName | string): TransparentTexture {
  const { texture, textureName } = acc

  if (texture === textureName) {
    return { texture, textureName, }
  }

  if (nextTexture.includes(textureName)) {
    return { texture, textureName: `${textureName}_transparent.png`, }
  }
  return { textureName, texture: nextTexture as Types.TextureName }
}

export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}


export function getShuffledReelSymbols(textures: TextureName[], x: number, y: number, reelId: number): ReelSymbolData[] {
  return textures.concat(textures[0]).slice()
    .sort(() => Math.random() - 0.5)
    .map((texture, symbolId) => {
      return {
        reelId,
        symbolId,
        x: x,
        y: y * symbolId,
        texture,
        filter: null,
      }
    })
}

export const mapWinSymbols = (): [number, number, string, number][] => {
  return  TRANSPARENT_SYMBOL_BIAS_LANDSCAPE.map(([x, y, name, scale]) => {
    return [
      x, y, name, scale
    ]
  })
}