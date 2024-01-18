import { JSX } from 'react';
import { BlurFilter } from 'pixi.js';
import { Sprite } from '@pixi/react';

interface ISymbolProps {
  texture: string
  y: number
  filters: BlurFilter[] | null
}
export const Symbol = ({ y, texture, filters }: ISymbolProps): JSX.Element => {

  return (
    <Sprite y={y} image={texture} width={240} height={240} filters={filters} />
  )
}