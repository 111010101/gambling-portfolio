import { IStore } from '../interfaces/interfaces';
import { injectable, inject } from 'inversify';
import { gsap } from 'gsap';
import { StateTypes, Types } from '../types/types';
import { action, makeAutoObservable, observable } from 'mobx';
import { BLEND_MODES, Texture } from 'pixi.js';
import { TRANSPARENT_SYMBOL_BIAS_LANDSCAPE } from '../constants/constants';
import { ColorMatrixFilter } from 'pixi.js';
import { load } from '../core/utils/Loader';
import { UIStore } from './UIStore';
import { myContainer } from '../inversify.config';



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

  private _numbers: Texture[] = []

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
    const onUpdate = this.incrementCount.bind(this)
    gsap.to({ t: 0 }, {
      duration: 1,
      onUpdate,
      onComplete: () => {
        this.count = 0
        this.filter = null
        resolve()
      },
      repeat: 1
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
    const uiStore = myContainer.get<UIStore>(Types.UIStore)
    switch (state) {
      case StateTypes.WIN_LINE:
        await uiStore.update('WinLineState')
        await this.win()
        await uiStore.update('IdleState')
        break;
    }

    return Promise.resolve(StateTypes.IDLE)
  }

  setNumberTextures(assets: Texture[]): void | never {``
    if (assets.length === 0) {
      throw new Error(`There is no any asset in array ${assets}`)
    }
    this._numbers = assets
  }

  get numbers(): Texture[] {
    return this._numbers.slice()
  }

  get comma() {
    return this._numbers[this.numbers.length - 1]
  }

}