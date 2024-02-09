import './Reel.module.css'

import { observer } from 'mobx-react-lite';
import React, { JSX } from 'react';
import { Container } from '@pixi/react';
import { Symbol } from './Symbol';
import { myContainer } from '../../inversify.config';
import { Types } from '../../types/types';
import { NetworkStore } from '../../stores/NetworkStore';
import { WinLineStore } from '../../stores/WinLineStore';

type ReelSymbolData = Types.ReelSymbolData
interface IReelProps {
  x: number,
  reelSymbolData: ReelSymbolData[]
  index: number
}
const winLineStore = myContainer.get<WinLineStore>(Types.WinLineStore)
const netWorkStore = myContainer.get<NetworkStore>(Types.NetWorkStore)
export const Reel = observer((props: IReelProps): JSX.Element => {
  const { x, reelSymbolData } = props
  const index = [0, 1, 2, 3, 4].sort().pop()
  if (!index) {
    throw new Error('index is undefined')
  }
  return (
    <Container x={x} >
      { Object.entries(netWorkStore.newSymbols[index]).map(([index, texture]) => {
        const data = reelSymbolData[Number(index)]
        return <Symbol winLineStore={winLineStore} texture={texture} y={data.y} filters={null} index={Number(index)} key={Math.random()} />
      })}
    </Container>
  )
})
