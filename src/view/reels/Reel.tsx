import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { Container } from '@pixi/react';
import { IReelData, ReelSymbolData } from '../../interfaces/interfaces';
import { Symbol } from './Symbol';
import { reelStore } from '../../stores/ReelStore';
interface IReelProps {
  textures: string[],
  x: number,
  y: number
  reelData: ReelSymbolData[]
}

export const Reel = observer((props: IReelProps): JSX.Element => {
  const { x, y, textures, reelData } = props;
  return (
    <Container x={x} >
      {reelData.map((data) => {
        return <Symbol texture={data.texture} y={data.y} key={Math.random()} />
      })}
    </Container>
  )
})
