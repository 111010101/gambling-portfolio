import { IReelData, IStore, ReelSymbolData } from '../interfaces/interfaces';
import { COUNT_OF_REELS, REEL_CORDS, TEXTURES } from '../constants/constants';
import { observable, action } from 'mobx';
import { makeAutoObservable } from 'mobx';
import { gsap } from "gsap";
import { PointCords, State } from '../types/types';
import { BlurFilter } from 'pixi.js';

class ReelStore implements IStore {
  readonly filterStrength = 2
  public countOfReels: number

  @observable
  public isSpinProgress: boolean = false
  @observable
  public isIdle: boolean = true

  @observable
  public _textures: string[]
  @observable
  private readonly _reels: IReelData[]

  @observable
  private _filters: BlurFilter[] | null
  private _blurFilter: BlurFilter = new BlurFilter(this.filterStrength)

  constructor(textures: string[], countOfReels: number, { x, y }: PointCords) {
    makeAutoObservable(this, undefined, { deep: true })
    this._filters = null
    this._textures = textures
    this.countOfReels = countOfReels
    this._reels = [...new Array(countOfReels)].map((_, index) => {
      return {
        x: x * index,
        symbols: this.getShuffledReelSymbols(textures, x * index, y),
        index,
        y: y * index,
      }
    })
  }

  public async update(state: State): Promise<void> {
    switch (state) {
      case 'SpinState':
        return this.spinReels()
    }
    return Promise.resolve()
  }

  private async spin(reelIndex: number): Promise<void> {
    setTimeout(() => {
      this.setSpinProgress(true)
      this.spinReel(reelIndex)
    }, reelIndex * 50)
  }

  public async spinReels(): Promise<void> {
    await this.reels.reduce((promise, _, reelIndex) => {
      return promise
        .then(() => this.spin(reelIndex))
    }, Promise.resolve())
  }



  private spinReel(reelIndex: number, spinDuration: number = 0.2): void {
    const reel = this._reels[reelIndex];
    const symbolHeight = 240; // Высота одного символа
    const reelHeight = 240 * 5; // Общая высота барабана

    reel.symbols.forEach(async (symbol) => {
      await this.symbolEase(symbol, 'up')
      await this.spinSymbol(reel, symbol, symbolHeight, reelHeight, spinDuration)
      await this.symbolEase(symbol, 'down')
    });
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
  @action
  private getShuffledReelSymbols(textures: string[], x: number, y: number): ReelSymbolData[] {
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

export const reelStore = new ReelStore(TEXTURES.slice(), COUNT_OF_REELS, REEL_CORDS)