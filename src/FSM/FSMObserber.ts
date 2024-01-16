import { State } from '../types/types';
import { StateData } from '../interfaces/interfaces';

export class FSMObserver {

  private states: State[] = []
  private subscribers: StateData[] = []

  public async dispatch(states: State[]): Promise<void> {
    return states.reduce((promise: Promise<void>, state) => {
      return promise.then(() => this.updateStateData(state))
    }, Promise.resolve())
  }

  public unsubscribe(fn: Function) {
    this.subscribers = this.subscribers.filter(({ callback }) => callback !== fn)
  }

  public subscribe(callback: Function, { state, store, nextState }: StateData) {
    this.subscribers.push({ callback, state, store, nextState })
  }
  private updateStateData(newState: State) {
    const stateData = this.subscribers.find(({ state }) => state === newState)
    if (!stateData) {
      throw new Error(`The ${newState} doesn\'t exist in subscribers`)
    }
    const { callback, store, state, nextState } = stateData
    return store
      .update(callback.bind(null, state))
      .then(() => this.dispatch([nextState]))
  }
}