import { BlurFilter, Point } from 'pixi.js';
import { DeepReadonly } from 'ts-essentials';

export namespace Types {
  export type ImageType = '.png' | '.jpeg' | 'jpg' | '.webp'
  export type RotationData = [Math["PI"], number]
  export type Currency = 'USD' | 'EUR' | 'UAH'  | 'DEMO'
  export type UserAction = 'spin' | 'initFreeSpin' | 'FreeSpin' | 'FreeSpinEnd'
  export type SymbolData = { symbolId: number, texture: TextureName, }
  export type RangeToFour = 0 | 1 | 2 | 3 | 4
  export type WinCombination = {
    [keys: string]: SymbolData;
  }
  export type FoundedTransparentTexture = { texture: TextureName, textureName: TextureName | string }
  export type TextureName = `${string}${ImageType}`
  export type State = `${string}${'State'}`
  export type PointCords = Readonly<Pick<Point, "x" | "y">>
  export type PairWithCord = [number, number, string, number]
  export type HttpRequest = `${'http' | 'https'}${string}`
  export type Size = Readonly<{
    width: number
    height: number
  }>
  export type SealedObject = Readonly<{ [key: string]: string | number }>
  export type RegisteredData = DeepReadonly<{
    storeName: string,
    state: Types.State
  }[]>
  export type ReelSymbolData = {
    x: number
    y: number
    texture: TextureName
    filter: BlurFilter[] | null
  }
  export type Symbols = TextureName[]
  export type GameButtonState = `is${string}ButtonActive`
  export const FSM = Symbol.for('FSM')
  export const NetWorkStore = Symbol.for('NetworkStore')
  export const ReelStore = Symbol.for('ReelStore')
  export const UIStore = Symbol.for('UIStore')
  export const WinLineStore = Symbol.for('WinLineStore')
  export const IStore = Symbol.for('IStore')
  export const ClockStore = Symbol.for('ClockStore')
  export const NetworkRequest = Symbol.for('NetworkRequest')
}

export namespace StateTypes {
  export const SPIN: Types.State = 'SpinState'
  export const IDLE: Types.State = 'IdleState'
  export const NETWORK: Types.State = 'NetworkState'
  export const WIN_LINE: Types.State = 'WinLineState'

}