import { JSX } from 'react';
import { BlurFilter } from 'pixi.js';
import { Sprite } from '@pixi/react';
import { SYMBOL_SIZE } from '../../constants/constants';

interface ISymbolProps {
  texture: string
  y: number
  filters: BlurFilter[] | null
}
export const Symbol = ({ y, texture, filters }: ISymbolProps): JSX.Element => {
  const { width, height } = SYMBOL_SIZE
  return (
    <Sprite y={y} image={texture} width={width} height={height} filters={filters} />
  )
}