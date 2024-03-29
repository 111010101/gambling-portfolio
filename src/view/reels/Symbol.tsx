import { JSX } from 'react';
import { BlurFilter, Texture } from 'pixi.js';
import { Container, Sprite } from '@pixi/react';
import { SYMBOL_SIZE } from '../../constants/constants';
import { Types } from '../../types/types';
import { myContainer } from '../../inversify.config';
import { ReelStore } from '../../stores/ReelStore';
import { compareImageReducer } from '../../functions/PureFunctions';
import { WinLineStore } from '../../stores/WinLineStore';
import { observer } from 'mobx-react-lite';
import { WinSymbol} from './WinSymbol';

interface ISymbolProps {
  texture: Types.TextureName
  y: number
  filters: BlurFilter[] | null
  transparentTexture?: Types.TextureName
  index: number

  winLineStore: WinLineStore
}

const reelStore = myContainer.get<ReelStore>(Types.ReelStore)


const id = setTimeout(() => {
  const winLineStore = myContainer.get<WinLineStore>(Types.WinLineStore)
  winLineStore.updateTransparentSymbol()
  clearTimeout(id)
}, 200)

export const Symbol = observer (({ winLineStore, y, texture, filters, index }: ISymbolProps): JSX.Element | never  => {

  const textureName = texture.split('.')[0]
  let { textureName: foundedTexture } = reelStore
    .textures
    .reduce(compareImageReducer, { texture: 'empty.png', textureName, })

  const { width, height } = SYMBOL_SIZE
  const [biasX, biasY, _, scale] = winLineStore.symbolData.reduce((data, [x1, x2, symbolName, scale1]) => {
    const [x0, y0, name, scale0] = data
    const [textureName1] = name.split('.')
    const [textureName2] = symbolName.split('.')
    if (foundedTexture.includes(textureName1)) {
      return [x0, y0, name, scale0]
    } else if (foundedTexture.includes(textureName2)) {
      return [x1, x2, name, scale1]
    }
    return data
  })

  return (
    <Container>
      <Sprite y={y}  image={texture} width={width} height={height}  filters={filters} />
      <WinSymbol
        x={biasX} y={y + biasY} texture={Texture.from(texture)}
        zIndex={(index + 1) ** (index + 1)}
        scale={ { x: scale, y: scale } }
        filters={(index > 0 && index < 4 ) ? winLineStore.filter : null}/>
    </Container>
  )
})
