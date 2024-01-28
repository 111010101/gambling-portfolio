import { Point } from 'pixi.js';
import { DeepReadonly } from 'ts-essentials';

export namespace Types {
  type ImageType = '.png' | '.jpeg' | 'jpg' | '.webp'
  export type FoundedTransparentTexture = { texture: TextureName, textureName: TextureName | string }
  export type TextureName = `${string}${ImageType}`
  export type State = `${string}${'State'}`
  export type PointCords = Readonly<Pick<Point, "x" | "y">>
  export type PairWithCord = [number, number, string]
  export type Size = Readonly<{
    width: number
    height: number
  }>
  export type SealedObject = Readonly<{ [key: string]: string | number }>
  export type RegisteredData = DeepReadonly<{
    storeName: string,
    state: Types.State
  }[]>
  export const FSM = Symbol.for('FSM')
  export const ReelStore = Symbol.for('ReelStore')
  export const UIStore = Symbol.for('UIStore')
  export const WinLineStore = Symbol.for('WinLineStore')
  export const IStore = Symbol.for('IStore')
}

export namespace StateTypes {
  export const SPIN: Types.State = 'SpinState'
  export const IDLE: Types.State = 'IdleState'
}