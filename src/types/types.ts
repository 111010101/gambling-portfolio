import { Point } from 'pixi.js';

export type State = `${string}${'State'}`
export type PointCords = Readonly<Pick<Point, "x" | "y">>
export type Size = Readonly<{
  width: number
  height: number
}>
export type SealedObject = Readonly<{ [key: string]: string | number }>