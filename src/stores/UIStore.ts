import { IStore } from '../interfaces/interfaces';
import { injectable } from 'inversify';
import { Types } from '../types/types';
import { action, observable } from 'mobx';

@injectable()
export class UIStore implements IStore {

  @observable
  public isSpinProgress: boolean = false
  @observable
  public isIdle: boolean = true

  @observable
  public rotation: number

  constructor() {
    this.rotation = Math.PI * 2
    window.addEventListener('resize', this.updateRotation.bind(this))
  }

  public async update(state: Types.State): Promise<Types.State> {
    switch (state) {
      case 'SpinState':
      case 'WinLineState':
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

  @action
  updateRotation(): void {
    if (window.innerWidth > window.innerHeight) {
      this.rotation = Math.PI * 2
    } else {
      this.rotation = Math.PI * 1.5
    }
  }

}
