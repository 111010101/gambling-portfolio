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
  BORDER_SCALE,
  STAGE_CORDS,
} from './constants/constants';
import { observer } from 'mobx-react-lite';
import { myContainer } from './inversify.config';
import { Types, StateTypes } from './types/types';
import { IApp, IFsm } from './interfaces/interfaces';
import { UIStore } from './stores/UIStore';
import { useCallback } from 'react';
import { getBorderGraphic } from './functions/SideEffectsFunctions';
import { Clock } from './view/Clock/Clock';
import { ClockStore } from './stores/ClockStore';

const colorFilter = new ColorMatrixFilter()
const colorFoBorder = new ColorMatrixFilter()
colorFoBorder.brightness(2, true)
colorFilter.brightness(0.8, false)
const uiStore = myContainer.get<UIStore>(Types.UIStore)
const FSM = myContainer.get<IFsm>(Types.FSM)
const clockStore = myContainer.get<ClockStore>(Types.ClockStore)
const toSpin = () => FSM.dispatch([StateTypes.SPIN])

const App = observer(({ textures }: IApp) => {
  const { width, height } = SCENE_SIZE
  const draw = useCallback(getBorderGraphic, []);
  uiStore.updateRotation();
  clockStore.setTexture(textures);
  return (
    <Stage options={SCENE_OPTIONS} width={width} height={height}>
      <Container  scale={STAGE_SCALE} anchor={CENTER_ANCHOR}>
        <Graphics draw={draw} />
        <Reels
          resources={textures}
          scale={REELS_SCALE}
          reelsY={REELS_CORDS.y}
          reelsX={REELS_CORDS.x}
        />
        <Sprite
          filters={[colorFilter]}
          image="border.png"
          scale={ { x: 1, y: 1.05} }
          x={REELS_BORDER.x}
          y={REELS_BORDER.y}
          anchor={CENTER_ANCHOR}
        />
        <Sprite
          image="border_slot.png"
          x={460}
          y={20}
          scale={BORDER_SCALE}
        />
        <Sprite image={'clock_background.png'}
                x={SPIN_BUTTON.x - 282}
                y={SPIN_BUTTON.y + -160}
          //   width={SPIN_BUTTON.width}
          // height={SPIN_BUTTON.height}
                scale={0.3}
                filters={[colorFoBorder]}
        />
        <Sprite
          interactive={uiStore.spinButtonActive}
          cursor={'pointer'}
          ontap={toSpin}
          onclick={toSpin}
          image="spin_t.png"
          x={SPIN_BUTTON.x - 15}
          y={SPIN_BUTTON.y}
          width={SPIN_BUTTON.width}
          height={SPIN_BUTTON.height}
          anchor={CENTER_ANCHOR}
          rotation={uiStore.rotation}
        />
        <Clock textures={textures} />
      </Container>

    </Stage>
  )
})

export default App
