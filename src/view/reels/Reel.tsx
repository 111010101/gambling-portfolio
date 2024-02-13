import './Reel.module.css'
import { shuffle } from '../../functions/PureFunctions';
import { observer } from 'mobx-react-lite';
import React, { JSX } from 'react';
import { Container } from '@pixi/react';
import { Symbol } from './Symbol';
import { myContainer } from '../../inversify.config';
import { Types } from '../../types/types';
import { NetworkStore } from '../../stores/NetworkStore';
import { WinLineStore } from '../../stores/WinLineStore';
import { COUNT_OF_REELS } from '../../constants/constants';

type ReelSymbolData = Types.ReelSymbolData
interface IReelProps {
  x: number,

  y?: number
  reelSymbolData: ReelSymbolData[]
  index: number
}
const winLineStore = myContainer.get<WinLineStore>(Types.WinLineStore)
const netWorkStore = myContainer.get<NetworkStore>(Types.NetWorkStore)
let i = 0;
export const Reel = observer((props: IReelProps): JSX.Element => {
  const { x, y, reelSymbolData } = props
  const index: number = [...new Array(COUNT_OF_REELS)].map((_, i) => i).pop() as number

  return (
    <Container x={x} y={y} >
      { Object.entries(netWorkStore.newSymbols[index]).map(([index, texture]) => {
        const data = reelSymbolData[Number(index)]
        return <Symbol winLineStore={winLineStore} texture={texture} y={data.y} filters={null} index={Number(index)} key={Math.random()} />
      })}
    </Container>
  )
})
