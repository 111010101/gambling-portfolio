import './Reel.module.css'

import { observer } from 'mobx-react-lite';
import React, { JSX } from 'react';
import { Container } from '@pixi/react';
import { Symbol } from './Symbol';
import { myContainer } from '../../inversify.config';
import { Types } from '../../types/types';
import { NetworkStore } from '../../stores/NetworkStore';

type ReelSymbolData = Types.ReelSymbolData
interface IReelProps {
  x: number,
  reelSymbolData: ReelSymbolData[]
  index: number
}

const netWorkStore = myContainer.get<NetworkStore>(Types.NetWorkStore)
export const Reel = observer((props: IReelProps): JSX.Element => {
  const { x, reelSymbolData } = props

  return (
    <Container x={x} >
      { Object.entries(netWorkStore.symbols).sort().map(([index, texture]) => {
        const data = reelSymbolData[Number(index)]
        return <Symbol texture={texture} y={data.y} filters={null} index={Number(index)} key={Math.random()} />
      })}
    </Container>
  )
})
