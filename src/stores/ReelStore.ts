import { IReelData, IStore, ReelSymbolData } from '../interfaces/interfaces';
import { COUNT_OF_REELS, REEL_CORDS, TEXTURES } from '../constants/constants';
import { observable, computed } from 'mobx';
import { makeAutoObservable } from 'mobx';

class ReelStore implements IStore {
  public countOfReels: number

  @observable
  public _textures: string[]
  private _reels: IReelData[]

  constructor(textures: string[], countOfReels: number, { x, y }: { x: number, y: number}) {
    makeAutoObservable(this, undefined, { deep: true })
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

  public update(): Promise<void> {
   return Promise.resolve()
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