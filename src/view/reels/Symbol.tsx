import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { BlurFilter } from 'pixi.js';
import { Sprite } from '@pixi/react';

export const Symbol = ({ y, texture }: { texture: string, y: number }): JSX.Element => {

  return (
    <Sprite y={y} image={texture} width={240} height={240} />
  )
}