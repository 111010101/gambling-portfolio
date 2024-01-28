import { observer } from 'mobx-react-lite';
import React, { JSX } from 'react';
import { Container } from '@pixi/react';
import { ReelSymbolData } from '../../interfaces/interfaces';
import { Symbol } from './Symbol';
import { BlurFilter } from 'pixi.js';

interface IReelProps {
  x: number,
  reelData: ReelSymbolData[]
  filter: BlurFilter[] | null
}

export const Reel = observer((props: IReelProps): JSX.Element => {
  const { x, reelData, filter } = props

  return (
    <Container x={x} >
      {reelData.map((data: ReelSymbolData, index: number): JSX.Element => {
        return <Symbol texture={data.texture}  index={index}  filters={filter} y={data.y} key={Math.random()} />
      })}
    </Container>
  )
})
