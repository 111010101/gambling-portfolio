import { IStore } from '../interfaces/interfaces';
import { injectable } from 'inversify';
import { gsap } from 'gsap';
import { Types } from '../types/types';
import { action, makeAutoObservable, observable } from 'mobx';
import { BLEND_MODES } from 'pixi.js';
import { throttle } from '../functions/SideEffectsFunctions';

@injectable()
export class WinLineStore implements IStore {

  @observable
  public blendMode: BLEND_MODES = BLEND_MODES.ADD //| BLEND_MODES.NONE


  constructor() {
    makeAutoObservable(this, undefined, { deep: true })
      //setTimeout(this.highlightSymbol.bind(this), 1000)
  }

  private highlightSymbol() {
    const onUpdate = throttle(() => {
      this.changeBlendMode()
    }, 200)
    gsap.to({ t: 0 }, {
      y: '+=' + 10,
      duration: 1,
      onUpdate,
      onComplete: () => {
        this.blendMode = BLEND_MODES.ADD
      },
      repeat: 6
    })
  }

  @action
  changeBlendMode = () => {
    this.blendMode = this.blendMode === BLEND_MODES.ADD ? BLEND_MODES.NONE : BLEND_MODES.ADD
  }

  public async update(state: Types.State): Promise<Types.State> {
    return Promise.resolve(state)
  }

}