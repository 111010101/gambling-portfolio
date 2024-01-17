import { State } from '../types/types';

export type ReelSymbolData = {
  x: number
  y: number
  texture: string
}

export interface IReelData {
  x: number
  y: number
  index: number
  symbols: ReelSymbolData[]
}

export interface IStore {
  update: (state: State) => Promise<void>
}

export type StateData = { callback: Function, state: State, store: IStore, nextState: State }