import { Stage, Container, Sprite } from '@pixi/react';
import { Reels } from './view/reels/Reels';
import { reelStore } from './stores/ReelStore';
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

const colorFilter = new ColorMatrixFilter()
colorFilter.brightness(0.8, false)
const App = observer(() => {
  const { width, height } = SCENE_SIZE
  return (
    <Stage options={SCENE_OPTIONS} width={width} height={height}>
      <Container scale={STAGE_SCALE} anchor={CENTER_ANCHOR}>
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
        interactive={reelStore.isIdle}
        cursor={'pointer'}
        onclick={() => reelStore.spinReels()}
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
