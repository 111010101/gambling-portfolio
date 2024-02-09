import { DeepReadonly } from 'ts-essentials';
import { Types } from '../types/types';
import TextureName = Types.TextureName;

export const TEXTURES: Readonly<TextureName[]> = [
  'five.png',
  'grape.png',
  'fruit.png',
  'ring.png',
  'zero.png',
]

export const winCombinations: Types.WinCombination = {
  'five':  { symbolId: 0, texture: 'five.png', },
  'grape': { symbolId: 1, texture: 'grape.png', },
  'fruit': { symbolId: 2, texture: 'fruit.png', },
  'ring':  { symbolId: 3, texture: 'ring.png', },
  'zero':  { symbolId: 4, texture: 'zero.png', },
}

export const COUNT_OF_REELS = 4

export const REEL_CORDS: Types.PointCords = {
  x: 240,
  y: 240,
}
export const CENTER_ANCHOR: Types.PointCords = {
  x: 0.5, y: 0.5
}

export const SYMBOL_SIZE: Types.Size = {
  width: 240,
  height: 240,
}

export const REELS_MASK: Types.PointCords & Types.Size = {
  width: 1020,
  height: 670,
  x: 0,
  y: -50,
}

export const SCENE_OPTIONS = {
  backgroundColor: 0xFFFFFF
}

export const SCENE_SIZE: Readonly<Types.Size> = {
  width: 1800,
  height: 1024,
}

export const STAGE_SCALE: Types.PointCords = { x: 0.8, y: 0.8 }
export const STAGE_CORDS: Types.PointCords = { x: 100, y: 0 }

export const REELS_SCALE: Types.PointCords = { x: 0.67, y: 0.72 }
export const REELS_CORDS: Types.PointCords = { x: 639, y: -85, }

export const BORDER_SCALE: Types.PointCords = {x: 1.1, y: 1.15 }
export const TRANSPARENT_SYMBOL_BIAS_LANDSCAPE: Types.PairWithCord[] = [
  [120, 102 + 12, 'fruit_transparent.png', 1.6],
  [120 + 0.9, 103 + -2.5, 'grape_transparent.png', 1.6],
  [120, 104 + 20, 'zero_transparent.png', 1.6],
  [120 + -5, 105 + 10, 'ring_transparent.png', 1.6],
  [120, 106, 'five_transparent.png', 1.7],
]
export const REELS_BORDER: Types.PointCords = {
  x: 1920 / 2,
  y: 1080 / 2 - 40,
}

export const SPIN_BUTTON: Types.PointCords & Types.Size = {
  x: 970,
  y: 920,
  width: 256,
  height: 256,
}

export const ClockData = {
  anchor: CENTER_ANCHOR,
  scale: 0.31,
  width: 600,
  x: 240,
  y: 230,
}

export const STATES: DeepReadonly<Types.RegisteredData> = [
  {
    state: 'SpinState',
    storeName: 'ReelStore'
  },
  {
    state: 'IdleState',
    storeName: 'UIStore'
  },
  {
    state: 'WinLineState',
    storeName: 'WinLineStore'
  },
  {
    state: 'NetworkState',
    storeName: 'NetworkStore'
  },
]
