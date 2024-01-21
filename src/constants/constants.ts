import { DeepReadonly } from 'ts-essentials';
import { Types } from '../types/types';

export const TEXTURES: Readonly<string[]> = [
  'five.png',
  'grape.png',
  'fruit.png',
  'ring.png',
  'zero.png',
]

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
  y: -100,
}

export const SCENE_OPTIONS = {
  backgroundColor: 0xFFFFFF
}

export const SCENE_SIZE: Readonly<Types.Size> = {
  width: 1920 / 1.5,
  height: 1080,
}

export const STAGE_SCALE: Types.PointCords = { x: 0.7, y: 0.7 }

export const REELS_SCALE: Types.PointCords = { x: 0.67, y: 0.72 }
export const REELS_CORDS: Types.PointCords = { x: 639, y: -85, }
export const REELS_BORDER: Types.PointCords = {
  x: 1920 / 2,
  y: 1080 / 2 - 40,
}

export const SPIN_BUTTON: Types.PointCords & Types.Size = {
  x: 1920 / 2.77,
  y: 750,
  width: 256,
  height: 256,
}

