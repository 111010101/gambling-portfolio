import { IStore } from '../interfaces/interfaces';
import { injectable } from 'inversify';
import { Types } from '../types/types';
import { makeAutoObservable, observable } from 'mobx';

let instance: UIStore
@injectable()
export class UIStore implements IStore {

  @observable
  public isSpinProgress: boolean = false
  @observable
  public isIdle: boolean = true

  constructor() {
    if (instance) {
      return instance
    }
    makeAutoObservable(this, undefined, { deep: true })
    instance = this
    return instance
  }

  public async update(state: Types.State): Promise<Types.State> {
    switch (state) {
      case 'SpinState':
        this.isSpinProgress = true;
        this.isIdle = false;
        break;
      case 'IdleState':
        this.isSpinProgress = false;
        this.isIdle = true;
        break;
    }
    return 'IdleState'
  }
}
