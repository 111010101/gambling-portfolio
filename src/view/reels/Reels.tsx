import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { Container } from '@pixi/react';
import { Reel } from './Reel';
import { ReelStore } from '../../stores/ReelStore';
import { Point, Texture } from 'pixi.js';
import { getMask } from './ReelMask';
import { REELS_MASK } from '../../constants/constants';
import { myContainer } from '../../inversify.config';
import { Types } from '../../types/types';
import { WinLineStore } from '../../stores/WinLineStore';
import { shuffle} from '../../functions/PureFunctions';

interface IReelsProps {
  readonly reelsX: number
  readonly reelsY: number
  readonly scale: Pick<Point, "x" | "y">
  readonly resources: Texture[]
}

const reelStore = myContainer.get<ReelStore>(Types.ReelStore)
const winLineStore = myContainer.get<WinLineStore>(Types.WinLineStore)

export const Reels = observer(({ reelsX, reelsY, scale, resources }: IReelsProps): JSX.Element => {
  const [key1, key2, key3, key4] = reelStore.reels.map(({ index }) => (1 + index) * Math.random())
  const [reelData1, reelData2, reelData3, reelData4] = reelStore.reels
  const [index1, index2, index3, index4] = reelStore.reels.map((_, index) => index)
  const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = reelStore
    .reels
    .map(({ symbols }, index) => {
      const { x, y } = symbols[index]
      return [x, y]
    })
  const { width, height, y, x } = REELS_MASK
  return (
    <Container  scale={scale} x={reelsX} y={reelsY} mask={getMask(width, height, x, y)}>
      <Reel index={index1} reelSymbolData={reelData1.symbols}  x={x1}  key={key1}/>
      <Reel index={index2} reelSymbolData={reelData2.symbols}  x={x2}  key={key2}/>
      <Reel index={index3} reelSymbolData={reelData3.symbols}  x={x3}  key={key3}/>
      <Reel index={index4} reelSymbolData={reelData4.symbols}  x={x4}  key={key4}/>
    </Container>
  )
})