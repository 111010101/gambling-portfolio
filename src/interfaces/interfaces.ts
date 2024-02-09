import { Types } from '../types/types';
import { Texture } from 'pixi.js';

export interface IFsm {
  readonly states: Types.State[]
  readonly subscribers: StateData[]
  readonly currentState: Types.State

  dispatch(states: Types.State[]): Promise<void>

  subscribe({ state, store }: StateData): void

}

export interface IReelData {
  x: number
  y: number
  index: number
  symbols: Types.ReelSymbolData[]
}

export interface IStore {
  update: (state: Types.State) => Promise<Types.State>
}

export type StateData = {
  state: Types.State,
  store: IStore
}

export interface INetwork {

}

export interface IApp {
  textures: Texture[]
}
