import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';
import { Reels } from './view/reels/Reels';

const App = () => {

  return (
    <Stage options={ { backgroundColor: 0xFFFFFF } } width={1920} height={1080}>
      <Container>
        <Sprite
          image="border.png"
          x={400}
          y={270}
          anchor={{ x: 0.5, y: 0.5 }}
        />
        <Reels key={Math.random()}/>
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
