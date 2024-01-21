import { IReelData, IStore, ReelSymbolData } from '../interfaces/interfaces';
import { COUNT_OF_REELS, REEL_CORDS, TEXTURES } from '../constants/constants';
import { observable, action, makeAutoObservable } from 'mobx';
import { gsap } from "gsap";
import { Types } from '../types/types';
import { BlurFilter } from 'pixi.js';
import { injectable } from 'inversify';
import { FSM } from '../FSM/FSMObserber';
import { UIStore } from './UIStore';
import { myContainer } from '../inversify.config';

let instance: ReelStore
@injectable()
export class ReelStore implements IStore {
  readonly filterStrength = 2
  public countOfReels: number = COUNT_OF_REELS

  @observable
  public isSpinProgress: boolean = false
  @observable
  public isIdle: boolean = true

  @observable
  public _textures: string[] = TEXTURES.slice()
  @observable
  private readonly _reels: IReelData[] = ReelStore.createReels(REEL_CORDS)

  @observable
  private _filters: BlurFilter[] | null = null
  private _blurFilter: BlurFilter = new BlurFilter(this.filterStrength)

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
        const uiStore = myContainer.get<UIStore>(Types.UIStore)
        await uiStore.update('SpinState')
        await this.spinReels()
        await uiStore.update('IdleState')
    }
    return Promise.resolve('IdleState')
  }

  private spin(reelIndex: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout( () => {
        this.setSpinProgress(true)
        this.spinReel(reelIndex).then(resolve)
      }, reelIndex * 50)
    })

  }

  public async spinReels(): Promise<void[]> {
    const promises: Promise<void>[] = []
    this.reels.forEach((_, reelIndex) => {
      promises.push(this.spin(reelIndex))
    })
    return Promise.all(promises)
  }



  private async spinReel(reelIndex: number,  spinDuration: number = 0.2): Promise<void> {
    const reel = this._reels[reelIndex];
    const symbolHeight = 240; // Высота одного символа
    const reelHeight = 240 * 5; // Общая высота барабана

    await reel.symbols.reduce(async (p, symbol) => {
      await this.symbolEase(symbol, 'up')
      await this.spinSymbol(reel, symbol, symbolHeight, reelHeight, spinDuration)
      await this.symbolEase(symbol, 'down')
      return p
    }, Promise.resolve());
  }

  symbolEase(symbol: ReelSymbolData, direction: 'up' | 'down'): Promise<void> {
    return new Promise(onComplete => {
      const y = direction === 'up' ? -20 : 20
      const ease = direction === 'up' ? 'back.in' : 'back.out'
      gsap.to(symbol, {
        y: '+=' + y,
        duration: 0.4,
        ease,
        onComplete() {
          if (direction === 'down') {
            gsap.to(symbol, {
              y: '+=' + -y,
              duration: 0.4,
              ease: 'back.in',
              onComplete,
            })
          } else {
            onComplete()
          }
        },
      })
    })
  }

  spinSymbol(
    reel: IReelData,symbol: ReelSymbolData,
    symbolHeight: number,
    reelHeight: number,
    duration: number,
  ): Promise<void> {
    return new Promise(resolve => {
      this.setFilter([this._blurFilter])
      gsap.to(symbol, {
        y: "+=" + symbolHeight, // Shift down by one symbol height
        duration,
        ease: 'power1.inOut',
        repeat: 10,
        onComplete: () => {
          const symbol = reel.symbols.reduce((previousValue, currentValue) => {
            if (previousValue.y < currentValue.y) {
              return currentValue
            }
            return previousValue
          })
          if (symbol.y >= reelHeight) {
            symbol.y -= reelHeight; // Move the symbol to the beginning
            symbol.texture = this.getRandomTexture()
          }
          this.setFilter([])
          this.setSpinProgress(false)
          resolve()
        }
      })
    })

  }

  getRandomTexture(): string {
    return this.textures.slice().sort(() => Math.random() - 0.5)[0]
  }

  get reels() {
    return this._reels
  }

  get textures() {
    return this._textures.slice().sort(() => Math.random() - 0.5)
  }

  private static createReels({ x, y }: Types.PointCords): IReelData[] {
    return [...new Array(COUNT_OF_REELS)].map((_, index) => {
      return {
        x: x * index,
        symbols: ReelStore.getShuffledReelSymbols(TEXTURES.slice(), x * index, y),
        index,
        y: y * index,
      }
    })
  }
  @action
  private static getShuffledReelSymbols(textures: string[], x: number, y: number): ReelSymbolData[] {
    return textures.concat(textures[0]).slice()
      .sort(() => Math.random() - 0.5)
      .map((texture, i) => {
        return {
          x: x,
          y: y * i,
          texture,
        }
      })
  }

  @observable
  get filters() {
    return this._filters
  }

  @action
  setFilter = (filter: BlurFilter[] | null) => {
    this._filters = filter
  }

  @action
  setSpinProgress = (isSpinProgress: boolean) => {
    this.isSpinProgress = isSpinProgress
    this.isIdle = !isSpinProgress
  }

}
