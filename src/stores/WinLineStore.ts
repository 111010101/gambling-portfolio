import { IStore } from '../interfaces/interfaces';
import { injectable } from 'inversify';
import { gsap } from 'gsap';
import { StateTypes, Types } from '../types/types';
import { action, makeAutoObservable, observable } from 'mobx';
import { BLEND_MODES } from 'pixi.js';
import { throttle } from '../functions/SideEffectsFunctions';
import { TRANSPARENT_SYMBOL_BIAS_LANDSCAPE } from '../constants/constants';
import { ColorMatrixFilter } from 'pixi.js';

@injectable()
export class WinLineStore implements IStore {

  @observable
  public blendMode: BLEND_MODES = BLEND_MODES.ADD //| BLEND_MODES.NONE

  @observable
  public filter: ColorMatrixFilter[] | null = null

  @observable
  public winSymbolsView : Types.PairWithCord[]

  @observable
  private count: number = 0

  constructor() {
    makeAutoObservable(this, undefined, { deep: true })
    this.filter = [new ColorMatrixFilter()]
    this.winSymbolsView = TRANSPARENT_SYMBOL_BIAS_LANDSCAPE.map(([x, y, name, scale]) => {
      return [
        x, y, name, scale
      ]
    })
  }

  @action
  incrementCount() {
    if (!this.filter) {
      this.filter = [new ColorMatrixFilter()]
      return
    }
    this.count += 0.1
    const { matrix } = this.filter[0]
    matrix[1] = Math.sin(this.count) * 3;
    matrix[2] = Math.cos(this.count);
    matrix[3] = Math.cos(this.count) * 1.5;
    matrix[4] = Math.sin(this.count / 3) * 2;
    matrix[5] = Math.sin(this.count / 2);
    matrix[6] = Math.sin(this.count / 4);
  }

  @action
  public updateTransparentSymbol() {
    this.winSymbolsView = this.winSymbolsView.slice().map(data => data)
  }

  private highlightSymbol(resolve: Function) {
    const onUpdate = throttle(() => {
      this.incrementCount()
    }, 20)
    gsap.to({ t: 0 }, {
      duration: 1.1,
      onUpdate,
      onComplete: () => {
        this.count = 0
        this.filter = null
        resolve()
      },
      repeat: 2
    })
  }

  @action
  changeBlendMode = () => {
    this.blendMode = this.blendMode === BLEND_MODES.ADD ? BLEND_MODES.NONE : BLEND_MODES.ADD
  }

  @action
  win(): Promise<void> {
    return new Promise(resolve => {
      this.highlightSymbol(resolve)
    })
  }

  public async update(state: Types.State): Promise<Types.State> {
    switch (state) {
      case StateTypes.WIN_LINE:
        await this.win()
        break;
    }

    return Promise.resolve(StateTypes.IDLE)
  }

}