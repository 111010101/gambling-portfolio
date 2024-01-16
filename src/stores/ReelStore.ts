import { IReel, IReelSymbol, IStore } from '../interfaces/interfaces';

export class ReelStore implements IStore {

  private countOfReels: number

  private _reels: IReel[]

  constructor(textures: string[], countOfReels: number, { x, y }: { x: number, y: number}) {
    this.countOfReels = countOfReels
    this._reels = [...new Array(countOfReels)].map((_, index) => {
      return {
        x: x * index,
        symbols: this.getShuffledReelSymbols(textures, x, y),
        index,
        y: 0,
      }
    })
  }

  public update(): Promise<void> {
   return Promise.resolve()
  }

  get reels() {
    return this._reels
  }

  private getShuffledReelSymbols(textures: string[], x: number, y: number): IReelSymbol[] {
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