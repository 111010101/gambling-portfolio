import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import { Reels } from './view/reels/Reels';

const App = () => {

  return (
    <Stage options={{ backgroundColor: 0xFFFFFF }} width={1920} height={1080}>
      <Container scale={{x: 0.7, y: 0.7}}>
        <Sprite
          image="border.png"
          x={1920 / 2}
          y={1080 / 2}
          anchor={{ x: 0.5, y: 0.5 }}
        />
        <Reels
          scale={{ x: 0.8, y: 0.8 }}
          reelsY={275}
          reelsX={640}
        />
      </Container>

      {/*<Sprite*/}
      {/*  image="lemon.png"*/}
      {/*  x={400}*/}
      {/*  y={270}*/}
      {/*  width={512}*/}
      {/*  height={512}*/}
      {/*  anchor={{ x: 0.5, y: 0.5 }}*/}
      {/*/>*/}

      {/*<Container x={400} y={330}>*/}
      {/*  <Text alpha={0} text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />*/}
      {/*</Container>*/}
    </Stage>
  );
};

export default App
