import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { ColorMatrixFilter, filters, Texture } from 'pixi.js';
import { Sprite, Container } from '@pixi/react';
import { ClockData } from '../../constants/constants';
import { ClockStore } from '../../stores/ClockStore';
import { myContainer } from '../../inversify.config';
import { Types } from '../../types/types';
import { throttle } from '../../functions/SideEffectsFunctions';
import { useTick } from '@pixi/react';
import { Digit, Hours, Minutes, Seconds } from './NumberComponents';
import { ClockBackground } from './ClockBackground';

interface INumber {
  textures: Texture[]
}


const { scale, anchor, y, x } = ClockData


const colorFilter = new ColorMatrixFilter()
colorFilter.brightness(0.8, false)

const store = myContainer.get<ClockStore>(Types.ClockStore)
const updateTime = throttle(() => {
  store.updateTime()
}, 50)
export const Clock = observer(({ textures }: INumber): JSX.Element => {
  useTick(() => {
    updateTime()
  })
  const dot = textures[textures.length - 1]
  return (
    <Sprite anchor={anchor} scale={scale}  x={x} y={y} texture={Texture.from('clock_border.png')}>
      <Hours scale={0.76} y={-120} x={-500} filters={[colorFilter]} />
      <Digit scale={0.76} y={-180} x={-320} texture={dot}/>
      <Minutes  scale={0.76} y={-120} x={-180} filters={[colorFilter]} />
      <Digit scale={0.76} y={-180}  x={40} texture={dot} />
      <Seconds scale={0.76} y={-120} x={160} filters={[colorFilter]}/>
    </Sprite>
  )
})
