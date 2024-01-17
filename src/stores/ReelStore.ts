import { IReelData, IStore, ReelSymbolData } from '../interfaces/interfaces';
import { COUNT_OF_REELS, REEL_CORDS, TEXTURES } from '../constants/constants';
import { observable, computed } from 'mobx';
import { makeAutoObservable } from 'mobx';
import { gsap } from "gsap";
import { State } from '../types/types';

class ReelStore implements IStore {
  public countOfReels: number

  @observable
  public _textures: string[]
  private _reels: IReelData[]

  constructor(textures: string[], countOfReels: number, { x, y }: { x: number, y: number}) {
    makeAutoObservable(this, undefined, { deep: true })
    console.error(this)
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

  private spinReels(): void {
    this.reels.forEach((_, reelIndex) => this.spinReel(reelIndex))
  }

  public spinReel(reelIndex: number, spinDuration: number = 2): void {
    const reel = this._reels[reelIndex];
    const deltaY = 200

    reel.symbols.forEach(symbol => {
      gsap.to(symbol, {
        y: symbol.y + deltaY,
        duration: spinDuration,
        ease: 'power2.inOut',
        onComplete: () => {
          this.spinReel(reelIndex)
        }
      });
    });
  }
  get reels() {
    return this._reels
  }

  @computed
  get textures() {
    return this._textures.slice().sort(() => Math.random() - 0.5)
  }

  private getShuffledReelSymbols(textures: string[], x: number, y: number): ReelSymbolData[] {
    return textures.slice()
      .sort(() => Math.random() - 0.5)
      .map(texture => {
        return {
          x: x,
          y: y,
          texture,
        }
      })
  }

}

export const reelStore = new ReelStore(TEXTURES, COUNT_OF_REELS, REEL_CORDS)