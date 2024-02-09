import { Container, Sprite } from '@pixi/react';
import { Types } from '../../types/types';
import { ColorMatrixFilter, Texture } from 'pixi.js';
import { CENTER_ANCHOR } from '../../constants/constants';
interface IWinSymbolProps {
  scale: Types.PointCords
  x?: number
  y: number

  texture: Texture

  zIndex: number

  filters: ColorMatrixFilter[] | null

}

export const WinSymbol =  ({ filters, zIndex, texture, x, y, scale }: IWinSymbolProps) => {
  return (
    <Container y={y} scale={scale} zIndex={zIndex} x={x}>
      <Sprite anchor={CENTER_ANCHOR}  texture={texture} filters={filters} />
    </Container>
  )
}