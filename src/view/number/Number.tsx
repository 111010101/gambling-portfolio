import { observer } from 'mobx-react-lite';
import { Container } from '@pixi/react';
import { JSX } from 'react';
import { WinLineStore } from '../../stores/WinLineStore';
import { myContainer } from '../../inversify.config';
import { Types } from '../../types/types';
import { Texture } from 'pixi.js';
import { Sprite } from '@pixi/react';

interface INumber {
  textures: Texture[]
}

export const Number = observer(({ textures }: INumber): JSX.Element => {
  return (
    <Container>
      {textures.map(texture => {
        return <Sprite texture={texture} key={Math.random()}/>
      })}
    </Container>
  )
})