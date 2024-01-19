import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { Container } from '@pixi/react';
import { Reel } from './Reel';
import { reelStore } from '../../stores/ReelStore';
import { Point } from 'pixi.js';
import { getMask } from './ReelMask';
import { REELS_MASK } from '../../constants/constants';

interface IReelsProps {
  readonly reelsX: number
  readonly reelsY: number
  readonly scale: Pick<Point, "x" | "y">
}

export const Reels = observer(({ reelsX, reelsY, scale }: IReelsProps): JSX.Element => {
  const [key1, key2, key3, key4] = reelStore.reels.map(({ index }) => (1 + index) * Math.random())
  const [reelData1, reelData2, reelData3, reelData4] = reelStore.reels
  const [[x1], [x2], [x3], [x4]] = reelStore
    .reels
    .map(({ symbols }, index) => {
      const { x, y } = symbols[index]
      return [x, y]
    })
  const { width, height, y, x } = REELS_MASK
  return (
    <Container scale={scale} x={reelsX} y={reelsY} mask={getMask(width, height, x, y)}>
      <Reel reelData={reelData1.symbols} filter={reelStore.filters} x={x1}  key={key1}/>
      <Reel reelData={reelData2.symbols} filter={reelStore.filters} x={x2}  key={key2}/>
      <Reel reelData={reelData3.symbols} filter={reelStore.filters} x={x3}  key={key3}/>
      <Reel reelData={reelData4.symbols} filter={reelStore.filters} x={x4}  key={key4}/>
    </Container>
  )
})