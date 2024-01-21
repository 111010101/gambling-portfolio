import { Point } from 'pixi.js';
import { DeepReadonly } from 'ts-essentials';

export namespace Types {
  export type State = `${string}${'State'}`
  export type PointCords = Readonly<Pick<Point, "x" | "y">>
  export type Size = Readonly<{
    width: number
    height: number
  }>
  export type SealedObject = Readonly<{ [key: string]: string | number }>
  export type RegisteredData = DeepReadonly<{ storeName: string, state: Types.State }[]>
  export const FSM = Symbol.for('FSM')
  export const ReelStore = Symbol.for('ReelStore')
  export const UIStore = Symbol.for('UIStore')
}

export namespace StateTypes {
  export const SPIN: Types.State = 'SpinState'
  export const IDLE: Types.State = 'IdleState'
}