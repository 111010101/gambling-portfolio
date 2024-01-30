import './App.module.css'

import { Stage, Container, Sprite } from '@pixi/react';
import { Reels } from './view/reels/Reels';
import { Graphics } from '@pixi/react';
import { ColorMatrixFilter } from 'pixi.js';
import {
  CENTER_ANCHOR,
  SCENE_OPTIONS,
  SCENE_SIZE,
  REELS_SCALE,
  REELS_CORDS,
  STAGE_SCALE,
  REELS_BORDER,
  SPIN_BUTTON,
} from './constants/constants';
import { observer } from 'mobx-react-lite';
import { myContainer } from './inversify.config';
import { Types, StateTypes } from './types/types';
import { IFsm } from './interfaces/interfaces';
import { UIStore } from './stores/UIStore';
import { useCallback } from 'react';
import { getBorderGraphic } from './functions/SideEffectsFunctions';

const colorFilter = new ColorMatrixFilter()
colorFilter.brightness(0.8, false)

const App = observer(() => {
  const { width, height } = SCENE_SIZE
  const uiStore = myContainer.get<UIStore>(Types.UIStore)
  const FSM = myContainer.get<IFsm>(Types.FSM)
  const draw = useCallback(getBorderGraphic, []);
  return (
    <Stage options={SCENE_OPTIONS} width={width} height={height}>
      <Container  scale={STAGE_SCALE} anchor={CENTER_ANCHOR}>
        <Graphics draw={draw} />
        <Reels
          scale={REELS_SCALE}
          reelsY={REELS_CORDS.y}
          reelsX={REELS_CORDS.x}
        />
        <Sprite
          filters={[colorFilter]}
          image="border.png"
          width={1920}
          height={1080}
          scale={ { x: 1, y: 1.05} }
          x={REELS_BORDER.x}
          y={REELS_BORDER.y}
          anchor={CENTER_ANCHOR}
        />
        <Sprite
          image="border_slot.png"
          x={460}
          y={20}
          scale={{ x: 1.1, y: 1.15 }}
        />
      </Container>

      <Sprite
        interactive={uiStore.isIdle}
        cursor={'pointer'}
        onclick={() => FSM.dispatch([StateTypes.SPIN])}
        image="spin.png"
        x={SPIN_BUTTON.x}
        y={SPIN_BUTTON.y}
        width={SPIN_BUTTON.width}
        height={SPIN_BUTTON.height}
        anchor={CENTER_ANCHOR}
        rotation={Math.PI * 2}
      />
    </Stage>
  )
})

export default App
