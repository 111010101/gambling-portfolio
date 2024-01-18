import { Stage, Container, Sprite } from '@pixi/react';
import { Reels } from './view/reels/Reels';
import { FSM } from './FSM/FSMObserber';
import { reelStore } from './stores/ReelStore';

const App = () => {

  return (
    <Stage options={{ backgroundColor: 0xFFFFFF }} width={1920 / 1.5} height={1080}>
      <Container scale={{x: 0.7, y: 0.7}} anchor={0.5}>
        <Sprite
          image="border.png"
          x={1920 / 2}
          y={1080 / 2}
          anchor={{ x: 0.5, y: 0.5 }}
        />
        <Reels
          scale={{ x: 0.67, y: 0.72 }}
          reelsY={275}
          reelsX={639}
        />
      </Container>

      <Sprite
        interactive={true}
        cursor={'pointer'}
        onclick={() => reelStore.spinReels()}
        image="spin.png"
        x={1920 / 2.77}
        y={750}
        width={256}
        height={256}
        anchor={{ x: 0.5, y: 0.5 }}
      />
    </Stage>
  );
};

export default App
