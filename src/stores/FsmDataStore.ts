import { injectable } from 'inversify';
import { Types } from '../types/types';
import { NetworkStore } from './NetworkStore';
import { DeepReadonly } from 'ts-essentials';

@injectable()
export class FsmDataStore extends Object {

  nextState(): Types.State {
    return 'State'
  }

}