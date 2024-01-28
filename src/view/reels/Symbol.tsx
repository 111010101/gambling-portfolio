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
import PointCords = Types.PointCords;
import PairWithCord = Types.PairWithCord;

interface ISymbolProps {
  texture: Types.TextureName
  y: number
  filters: BlurFilter[] | null
  transparentTexture?: Types.TextureName
  index: number
}


export const Symbol = observer (({ y, texture, filters, transparentTexture, index }: ISymbolProps): JSX.Element | never  => {
  const reelStore = myContainer.get<ReelStore>(Types.ReelStore)
  const winLineStore = myContainer.get<WinLineStore>(Types.WinLineStore)
  const textureName = texture.split('.')[0]
  let { textureName: foundedTexture } = reelStore
    .textures
    .reduce(compareImageReducer, { texture: 'empty.png', textureName, })

  const { width, height } = SYMBOL_SIZE
    const cords = TRANSPARENT_SYMBOL_BIAS_LANDSCAPE.flatMap(([x, y, symbolName]) => {
      return [x, y]
    });
   const [biasX, biasY] = cords

  return (
    <Container>
      <Sprite y={y} zIndex={index} image={texture} width={width} height={height}  filters={filters} />
      <Sprite y={y + biasY} image={foundedTexture} x={biasX}
               anchor={CENTER_ANCHOR}
               zIndex={(index + 1) ** (index + 1)}
               width={width / 1.5}
               height={height / 1.51}
               blendMode={winLineStore.blendMode} />
    </Container>
  )
})
