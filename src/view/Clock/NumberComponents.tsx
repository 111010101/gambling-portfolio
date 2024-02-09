import { observer } from 'mobx-react-lite';
import { Container, Sprite } from '@pixi/react';
import { Texture } from 'pixi.js';
import { myContainer } from '../../inversify.config';
import { ClockStore } from '../../stores/ClockStore';
import { Types } from '../../types/types';
import { ColorMatrixFilter } from 'pixi.js';

interface DigitsProps {
  texture?: Texture
  x: number

  y: number
  filters?: ColorMatrixFilter[]

  scale: number
}

const store = myContainer.get<ClockStore>(Types.ClockStore)

export const Digit = ({ y, x, texture, scale }: DigitsProps) => {
  return (
    <Container x={x} y={y} scale={scale}>
      <Sprite  texture={texture}/>
      <Sprite y={50} texture={texture}/>
    </Container>
  )
}

export const Hours = observer(({ y, scale, x, filters }: DigitsProps) => {
  const [a, b] = store.getNewTime('getHours')
  return (
    <Container scale={scale} x={x} y={y}>
      <Sprite scale={reduceSix(a)} x={-15}  texture={store.hourDigitOne} filters={filters}/>
      <Sprite scale={reduceSix(b)} x={170} y={5} texture={store.hourDigitTwo}/>
    </Container>
  )
})

export const Minutes = observer(({ x, y, filters, scale }: DigitsProps) => {
  const [a, b] = store.getNewTime('getMinutes')
  return (
    <Container x={x} y={y} scale={scale}>
      <Sprite scale={reduceSix(a)} x={-10}  texture={store.minuteDigitOne} filters={filters}/>
      <Sprite scale={reduceSix(b)} x={170} y={10} texture={store.minuteDigitTwo} filters={filters}/>
    </Container>
  )
})

export const Seconds = observer(({ x, y, filters, scale }: DigitsProps) => {
  const [a, b] = store.getNewTime('getSeconds')
  return (
    <Container x={x} y={y} scale={scale}>
      <Sprite scale={reduceSix(a)} x={0}  y={-5} texture={store.secondDigitOne} filters={filters}/>
      <Sprite scale={reduceSix(b)} x={180} y={-5} texture={store.secondDigitTwo} filters={filters}/>
    </Container>
  )
})

const reduceSix = (n: number): number => {
  let scale: number = 1
  if (n === 6 || n === 7) {
    scale = scale * 0.95
  } else if (n === 0) {
    scale = scale * 1.05
  } else if (n === 3) {
    scale = scale * 1.1
  }
  return scale
}