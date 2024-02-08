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
  return (
    <Container scale={scale} x={x} y={y}>
      <Sprite x={0}  texture={store.hourDigitOne} filters={filters}/>
      <Sprite x={150} y={-5} texture={store.hourDigitTwo}/>
    </Container>
  )
})

export const Minutes = observer(({ x, y, filters, scale }: DigitsProps) => {
  return (
    <Container x={x} y={y} scale={scale}>
      <Sprite x={0}  texture={store.minuteDigitOne} filters={filters}/>
      <Sprite x={180} y={-5} texture={store.minuteDigitTwo} filters={filters}/>
    </Container>
  )
})

export const Seconds = observer(({ x, y, filters, scale }: DigitsProps) => {
  return (
    <Container x={x} y={y} scale={scale}>
      <Sprite x={0}  texture={store.secondDigitOne} filters={filters}/>
      <Sprite x={180} y={-5} texture={store.secondDigitTwo} filters={filters}/>
    </Container>
  )
})
