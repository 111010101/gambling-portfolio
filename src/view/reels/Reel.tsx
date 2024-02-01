import './Reel.module.css'

import { observer } from 'mobx-react-lite';
import React, { JSX } from 'react';
import { Container } from '@pixi/react';
import { ReelSymbolData } from '../../interfaces/interfaces';
import { Symbol } from './Symbol';
import { BlurFilter } from 'pixi.js';
import { myContainer } from '../../inversify.config';
import { Types } from '../../types/types';
import { ReelStore } from '../../stores/ReelStore';
import { NetworkStore } from '../../stores/NetworkStore';
type Symbols = Types.Symbols
interface IReelProps {
  x: number,
  reelData: ReelSymbolData[]
  index: number
}

const reelStore = myContainer.get<ReelStore>(Types.ReelStore)
const netWorkStore = myContainer.get<NetworkStore>(Types.NetWorkStore)
export const Reel = observer((props: IReelProps): JSX.Element => {
  const { x, reelData } = props

  return (
    <Container x={x} >
      { Object.entries(netWorkStore.symbols).map(([index, texture]) => {
        const data = reelData[Number(index)]
        return <Symbol texture={texture} y={data.y} filters={null} index={Number(index)} key={Math.random()} />
      })}
      {/*{reelData.map((data: ReelSymbolData, index: number): JSX.Element => {*/}
      {/*  return <Symbol texture={data.texture}  index={index}  filters={data.filter} y={data.y} key={Math.random()} />*/}
      {/*})}*/}
    </Container>
  )
})
