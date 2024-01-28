import { IStore } from '../interfaces/interfaces';
import { Types } from '../types/types';
//TODO: IN PROGRESS
export class NetworkStore implements IStore {

  async update(state: Types.State): Promise<Types.State> {
    return Promise.resolve(state)
  }

  isShouldTransitToNewState(states: Types.State[]): boolean {
    return !Math.random();
  }

}
