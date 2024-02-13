import { IStore } from '../interfaces/interfaces';
import { injectable } from 'inversify';
import { action, makeAutoObservable, observable } from 'mobx';
import { Types } from '../types/types';

type State = Types.State

@injectable()
export class UIStore implements IStore {

  @observable
  public isSpinProgress: boolean = false
  @observable
  public spinButtonActive: boolean = true

  @observable
  public rotation: number = 0

  constructor() {
    makeAutoObservable(this, undefined, { deep: true })
    this.setRotation(Math.PI * 2)
    window.addEventListener('resize', this.updateRotation.bind(this))
  }

  @action
  public async update(state: State): Promise<State> {
    let currentState: State = 'EmptyState'
    switch (state) {
      case 'IdleState':
        this.spinButtonActive = true
        currentState = 'IdleState' as State
        break
      case 'WinLineState':
      case 'SpinState':
      case 'NetworkState':
      case 'EmptyState':
        this.spinButtonActive = false
        break
    }

    return state
  }

  @action
  setRotation(radius: number) {
    this.rotation = radius
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
