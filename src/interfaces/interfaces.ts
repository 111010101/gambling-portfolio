import { Types } from '../types/types';
import { Texture } from 'pixi.js';
import Currency = Types.Currency;

type UserAction = Types.UserAction

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

export interface INetworkRequest<T> {

  token: string
  url: string

  currency: Currency

  fetch(): Promise<T | void>

  balance: number

  nextActions: UserAction[]

}

export interface IApp {
  textures: Texture[]
}
