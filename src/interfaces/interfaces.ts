import { State } from '../types/types';

export interface IReelSymbol {
  x: number
  y: number
  texture: string
}

export interface IReel {
  x: number
  y: number
  index: number
  symbols: IReelSymbol[]
}

export interface IStore {
  update: (callback: () => Promise<State>) => Promise<void>
}

export type StateData = { callback: Function, state: State, store: IStore, nextState: State }