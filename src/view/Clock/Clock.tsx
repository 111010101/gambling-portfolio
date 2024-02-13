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
import { Digit, Hours, Minutes, Seconds } from './NumberComponents';

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
      <Digit scale={0.76} y={-180} x={-300} texture={dot}/>
      <Minutes  scale={0.76} y={-120} x={-160} filters={[colorFilter]} />
      <Digit scale={0.76} y={-180}  x={30} texture={dot} />
      <Seconds scale={0.76} y={-120} x={160} filters={[colorFilter]}/>
    </Sprite>
  )
})
