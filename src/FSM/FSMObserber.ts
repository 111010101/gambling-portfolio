import { Types } from '../types/types';
import { IFsm, StateData } from '../interfaces/interfaces';
import { injectable } from 'inversify';

@injectable()
export class FSM implements IFsm {
  private _states: Types.State[] = []
  private _subscribers: StateData[] = []
  private _currentState: Types.State = 'IdleState'
  private _previousState: Types.State = 'EmptyState'

  public async dispatch(states: Types.State[]): Promise<void> {
    if (this._previousState === states[0]) {
      return;
    }
    this._previousState = this._currentState
    this._currentState = states[0]
    return states.reduce((promise: Promise<void>, state) => {
      return promise.then(() => this.updateStateData(state))
    }, Promise.resolve())
  }

  public subscribe({ state, store }: StateData): void {
    this._states.push(state)
    this._subscribers.push({ state, store })
  }
  private updateStateData(newState: Types.State): Promise<void> {
    const stateData: StateData | undefined = this._subscribers.find(({ state }) => state === newState)
    if (!stateData) {
      throw new Error(`The ${newState} doesn\'t exist in subscribers`)
    }

    const { store, state } = stateData
    return store
      .update(state)
      .then((nextState) => this.dispatch([nextState]))
  }

  get states(): Types.State[] {
    return this._states.slice()
  }

  get subscribers(): StateData[] {
    return this._subscribers.slice().map(data => Object.assign({}, data))
  }

  get currentState() {
    return this._currentState
  }

}
