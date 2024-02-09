import { NineSlicePlane } from '@pixi/react';
import { Texture } from 'pixi.js';
interface IClockBackground {
  texture: Texture
}
export const ClockBackground = ({ texture }: IClockBackground) => {
  return (
    <NineSlicePlane
      scale={2.5}
      leftWidth={-250}
      topHeight={15}
      rightWidth={-250}
      bottomHeight={100}




      texture={texture}
      anchor={[200, 100]}
      pivot={[490, 200]}

      width={1792 /2}
      height={1024 /2}
      x={250}
      y={120}
    />
  )
}