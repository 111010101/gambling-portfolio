import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { ReelSymbolData } from '../../interfaces/interfaces';
import { Sprite } from '@pixi/react';

export const Symbol = ({ y, texture }: { texture: string, y: number }): JSX.Element => {
  return (
    <Sprite y={y} image={texture} width={200} height={200} />
  )
}