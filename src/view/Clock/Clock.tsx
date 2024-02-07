import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { ColorMatrixFilter, Texture } from 'pixi.js';
import { Sprite } from '@pixi/react';
import { ClockData } from '../../constants/constants';
import { ClockStore } from '../../stores/ClockStore';
import { myContainer } from '../../inversify.config';
import { Types } from '../../types/types';
import { throttle } from '../../functions/SideEffectsFunctions';
import { useTick } from '@pixi/react';

type ClockType = [
  hours: string,
  minutes: string,
  seconds: string,
]

interface INumber {
  textures: Texture[]
}


const { scale, anchor, y, x, width } = ClockData

const separateTime = (time: string) => {
  return time.split('').map(Number)
}

const changeDate = (data: ClockType) => {
  data[0] = new Date().getHours().toLocaleString().padStart(2, '0')
  data[1] = new Date().getMinutes().toLocaleString().padStart(2, '0')
  data[2] = new Date().getSeconds().toLocaleString().padStart(2, '0')
  return data
}

const colorFilter = new ColorMatrixFilter()
colorFilter.brightness(0.8, false)

const store = myContainer.get<ClockStore>(Types.ClockStore)

export const Clock = observer(({ textures }: INumber): JSX.Element => {
  const hours = new Date().getHours().toLocaleString().padStart(2, '0')
  const minutes = new Date().getMinutes().toLocaleString().padStart(2, '0')
  const seconds = new Date().getSeconds().toLocaleString().padStart(2, '0')
  const clockData: ClockType = [hours, minutes, seconds]
  const updateTime = throttle(() => {
    store.updateTime()
  }, 50)
  const time = clockData.map(separateTime)
  let [[hourD1, hourD2], [minuteD1, minuteD2], [secondD1, secondD2]] = time.map(([t1, t2]) => {
    return [textures[t1], textures[t2]]
  })

  useTick(delta => {
    updateTime()
  })


  // setInterval(() => {
  //   console.error(store.secondDigitOne)
  // }, 500)
  const comma = textures.slice().pop()
  const commonY = 55
  return (
    <Sprite anchor={anchor}  scale={scale} x={x} y={y}  texture={Texture.from('clock_background.png')}>
      <Sprite x={-350} texture={store.hourDigitOne} key={Math.random()} y={commonY} filters={[colorFilter]} />
      <Sprite x={-175} texture={store.hourDigitTwo} key={Math.random()} y={commonY} filters={[colorFilter]}/>

      <Sprite x={25} texture={store.minuteDigitOne} key={Math.random()} y={commonY} filters={[colorFilter]}/>
      <Sprite x={155} texture={store.minuteDigitTwo} key={Math.random()} y={commonY} filters={[colorFilter]}/>

      <Sprite x={350} texture={store.secondDigitOne} key={Math.random()} y={commonY} filters={[colorFilter]}/>
      <Sprite x={505} texture={store.secondDigitTwo} key={Math.random()} y={commonY} filters={[colorFilter]}/>
    </Sprite>
  )
})