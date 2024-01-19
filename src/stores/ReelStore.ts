import { IReelData, IStore, ReelSymbolData } from '../interfaces/interfaces';
import { COUNT_OF_REELS, REEL_CORDS, TEXTURES } from '../constants/constants';
import { observable, action } from 'mobx';
import { makeAutoObservable } from 'mobx';
import { gsap } from "gsap";
import { PointCords, State } from '../types/types';
import { BlurFilter } from 'pixi.js';

class ReelStore implements IStore {
  readonly filterStrength = 4
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
      this.setFilter([this._blurFilter])
      this.spinReel(reelIndex)
    }, reelIndex * 200)
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

    reel.symbols.forEach(symbol => {
      gsap.to(symbol, {
        y: "+=" + symbolHeight, // Shift down by one symbol height
        duration: spinDuration,
        //scale: 2,
        repeat: 10,
        //yoyo: true,
        ease: "power2.inOut",
        onComplete: () => {
          const symbol = reel.symbols.reduce((previousValue, currentValue) => {
            if (previousValue.y < currentValue.y) {
              return currentValue
            }
            return previousValue
          })
          if (symbol.y >= reelHeight) {
            symbol.y -= reelHeight; // Move the symbol to the beginning
            symbol.texture = this.textures.slice().sort(() => Math.random() - 0.5)[0] // get random texture
          }
          this.setFilter([])
          this.setSpinProgress(false)
        }
      });
    });
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