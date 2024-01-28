import { Types } from '../types/types';

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
