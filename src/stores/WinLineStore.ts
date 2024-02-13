import { IStore } from '../interfaces/interfaces';
import { injectable, multiInject, inject } from 'inversify';
import { gsap } from 'gsap';
import { StateTypes, Types } from '../types/types';
import { action, makeAutoObservable, observable } from 'mobx';
import { BLEND_MODES, Texture } from 'pixi.js';
import { TRANSPARENT_SYMBOL_BIAS_LANDSCAPE } from '../constants/constants';
import { ColorMatrixFilter } from 'pixi.js';
import { UIStore } from './UIStore';
import { myContainer } from '../inversify.config';
import { NetworkRequest } from '../network/Network';

type Symbols = Types.Symbols

const requestDelay = 100

@injectable()
export class WinLineStore implements IStore {

  @observable
  public blendMode: BLEND_MODES = BLEND_MODES.ADD //| BLEND_MODES.NONE

  @observable
  public filter: ColorMatrixFilter[] | null = null

  winSymbolsView: Symbols
  public symbolData: [number, number, string, number][]

  @observable
  private count: number = 0

  private _numbers: Texture[] = []

  public newSymbols: Symbols[] = [
    [
      'five.png',
      'grape.png',
      'fruit.png',
      'ring.png',
      'zero.png',
    ],
    [
      'ring.png',
      'grape.png',
      'zero.png',
      'five.png',
      'fruit.png',
    ],
    [
      'ring.png',
      'fruit.png',
      'grape.png',
      'five.png',
      'zero.png',
    ],
    [
      'five.png',
      'grape.png',
      'fruit.png',
      'ring.png',
      'zero.png',
    ],
    [
      'zero.png',
      'ring.png',
      'fruit.png',
      'grape.png',
      'five.png',
    ],
  ]

  constructor() {
    makeAutoObservable(this, undefined, { deep: true })
    setTimeout(() => {
      this.updateWinLineData()
    }, requestDelay)
    this.filter = [new ColorMatrixFilter()]
    this.winSymbolsView = this.newSymbols[Math.floor(Math.random()*this.newSymbols.length)];
    this.symbolData = TRANSPARENT_SYMBOL_BIAS_LANDSCAPE.slice().sort().map(([x, y, symbolName, scale]) => {
      return [x, y, symbolName, scale]
    })

  }
  @action
  getSymbols() {
    this.winSymbolsView = this.newSymbols[Math.floor(Math.random()*this.newSymbols.length)];
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
    const index = [1, 2, 3,].sort().pop()
    const symbols = this.newSymbols[index ? index : 0]
    this.winSymbolsView = this.newSymbols[Math.floor(Math.random()*this.newSymbols.length)];
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
        console.error('win')
        await this.win()
        await uiStore.update('IdleState')
        break;
    }

    return Promise.resolve(StateTypes.IDLE)
  }

  setNumberTextures(assets: Texture[]): void | never {
    if (assets.length === 0) {
      throw new Error(`There is no any asset in array ${assets}`)
    }
    this._numbers = assets
  }

  get numbers(): Texture[] {
    return this._numbers.slice()
  }

  updateWinLineData(): void {
    const netWorkResponse = myContainer.get<NetworkRequest>(Types.NetworkRequest)
    netWorkResponse.fetch()
  }

}