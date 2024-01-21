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
import PIXI from 'pixi.js'
import { useCallback } from 'react';

const colorFilter = new ColorMatrixFilter()
colorFilter.brightness(0.8, false)

const App = observer(() => {
  const { width, height } = SCENE_SIZE
  const uiStore = myContainer.get<UIStore>(Types.UIStore)
  const FSM = myContainer.get<IFsm>(Types.FSM)
  const draw = useCallback((g: PIXI.Graphics) => {
    g.clear();
    g.beginFill(0x00000, 1);
    g.drawRect(635, 740, 650, 50);
    g.endFill()
    return g
  }, []);
  return (
    <Stage options={SCENE_OPTIONS} width={width} height={height}>
      <Container scale={STAGE_SCALE} anchor={CENTER_ANCHOR}>
        <Graphics draw={draw} />
        <Reels
          scale={REELS_SCALE}
          reelsY={REELS_CORDS.y}
          reelsX={REELS_CORDS.x}
        />
        <Sprite
          filters={[colorFilter]}
          image="border.png"
          x={REELS_BORDER.x}
          y={REELS_BORDER.y}
          anchor={CENTER_ANCHOR}
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
      />
    </Stage>
  )
})

export default App
