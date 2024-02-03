import { Types } from '../types/types';
import TextureName = Types.TextureName;

type ReelSymbolData = Types.ReelSymbolData
export function compareImageReducer(acc: Types.FoundedTransparentTexture, nextTexture: Types.TextureName | string): Types.FoundedTransparentTexture {
  const { texture, textureName } = acc
  if (texture === textureName) {
    return { texture, textureName, }
  }

  if (nextTexture.includes(textureName)) {
    return { texture, textureName: `${textureName}_transparent.png`, }
  }
  return { textureName, texture: nextTexture as Types.TextureName }
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