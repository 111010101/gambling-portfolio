import { Types } from '../types/types';
import TextureName = Types.TextureName;
import { Filter, BlurFilter } from 'pixi.js';

export interface IFsm {
  readonly states: Types.State[]
  readonly subscribers: StateData[]
  readonly currentState: Types.State

  dispatch(states: Types.State[]): Promise<void>

  subscribe({ state, store }: StateData): void

}

export type ReelSymbolData = {
  x: number
  y: number
  texture: TextureName
  filter: BlurFilter[] | null
}

export interface IReelData {
  x: number
  y: number
  index: number
  symbols: ReelSymbolData[]
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
