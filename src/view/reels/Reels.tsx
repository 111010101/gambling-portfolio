import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { Container } from '@pixi/react';
import { Reel } from './Reel';
import { reelStore } from '../../stores/ReelStore';
import { Point } from 'pixi.js';
import { getMask } from './ReelMask';

interface IReelsProps {
  readonly reelsX: number
  readonly reelsY: number
  readonly scale: Pick<Point, "x" | "y">
}

export const Reels = observer(({ reelsX, reelsY, scale }: IReelsProps): JSX.Element => {
  const [key1, key2, key3, key4] = reelStore.reels.map(({ index }) => (1 + index) * Math.random())
  const [[x1, y1], [x2, y2], [x3, y3], [x4, y4]] = reelStore
    .reels
    .map(({ symbols }, index) => {
      const { x, y } = symbols[index]
      return [x, y]
    })
  return (
    <Container scale={scale} x={reelsX} y={reelsY} mask={getMask(1020, 670, 0, -100)}>
      <Reel textures={reelStore.textures} x={x1} y={y1} key={key1}/>
      <Reel textures={reelStore.textures} x={x2} y={y2} key={key2}/>
      <Reel textures={reelStore.textures} x={x3} y={y3} key={key3}/>
      <Reel textures={reelStore.textures} x={x4} y={y4} key={key4}/>
    </Container>
  )
})