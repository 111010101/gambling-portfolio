import { observer } from 'mobx-react-lite';
import { JSX } from 'react';
import { Container } from '@pixi/react';
import { ReelSymbolData } from '../../interfaces/interfaces';
import { Symbol } from './Symbol';

export const Reel = observer((props: { textures: string[], x: number, y: number }): JSX.Element => {
  const { x, y, textures } = props;
  return (
    <Container x={x} >
      {textures.map((texture, i) => {
        return <Symbol texture={texture} y={y * i} key={Math.random()} />
      })}
    </Container>
  )
})
