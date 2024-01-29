import { JSX } from 'react';
import { BlurFilter } from 'pixi.js';
import { Container, Sprite } from '@pixi/react';
import { CENTER_ANCHOR, SYMBOL_SIZE, TRANSPARENT_SYMBOL_BIAS_LANDSCAPE } from '../../constants/constants';
import { Types } from '../../types/types';
import { myContainer } from '../../inversify.config';
import { ReelStore } from '../../stores/ReelStore';
import { compareImageReducer } from '../../functions/PureFunctions';
import { WinLineStore } from '../../stores/WinLineStore';
import { observer } from 'mobx-react-lite';

interface ISymbolProps {
  texture: Types.TextureName
  y: number
  filters: BlurFilter[] | null
  transparentTexture?: Types.TextureName
  index: number
}


export const Symbol = observer (({ y, texture, filters, index }: ISymbolProps): JSX.Element | never  => {
  const reelStore = myContainer.get<ReelStore>(Types.ReelStore)
  const winLineStore = myContainer.get<WinLineStore>(Types.WinLineStore)
  const textureName = texture.split('.')[0]
  let { textureName: foundedTexture } = reelStore
    .textures
    .reduce(compareImageReducer, { texture: 'empty.png', textureName, })

  const { width, height } = SYMBOL_SIZE
  let [biasX, biasY, name, _, scale] = TRANSPARENT_SYMBOL_BIAS_LANDSCAPE.reduce((data, [x, y, symbolName, scale,]) => {
    const [foundedX, foundedY, name, isFound] = data
    if (isFound) {
      return data
    }
    const [textureName] = symbolName.split('.')
    if (foundedTexture.includes(textureName)) {
      return [x, y, symbolName, true, scale]
    }
    return [x, y, symbolName, false, scale]
  }, [0, 0, 'false', false, 2])

  return (
    <Container>
      <Sprite y={y} zIndex={index} image={texture} width={width} height={height}  filters={filters} />
      <Sprite y={y + biasY} image={foundedTexture} x={biasX}
               anchor={CENTER_ANCHOR}
               zIndex={(index + 1) ** (index + 1)}
               width={width / 1.5}
               height={height / 1.51}
               scale={scale}
               blendMode={winLineStore.blendMode} />
    </Container>
  )
})
