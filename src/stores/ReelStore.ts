import { IReelData, IStore, ReelSymbolData } from '../interfaces/interfaces';
import { COUNT_OF_REELS, REEL_CORDS, TEXTURES } from '../constants/constants';
import { observable, computed, action } from 'mobx';
import { makeAutoObservable } from 'mobx';
import { gsap } from "gsap";
import { State } from '../types/types';

class ReelStore implements IStore {
  readonly countOfSpin = 20
  public countOfReels: number

  @observable
  public _textures: string[]
  @observable
  private readonly _reels: IReelData[]

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

  async spin(): Promise<void> {
    this.spinReels()
    await this.wait(150)
    this.spinReels()
    await this.wait(150)
    this.spinReels()
    await this.wait(150)
    this.spinReels()
    await this.wait(150)
    this.spinReels()
    await this.wait(150)
    this.spinReels()
    await this.wait(150)
    this.spinReels()
    await this.wait(150)
    this.spinReels()
    await this.wait(150)
  }

  public spinReels(): void {
    this.reels.forEach((_, reelIndex) => {
      setTimeout(() => {
        this.spinReel(reelIndex)
        //resolve(void 0)
      }, reelIndex * 10)
    })

    // ;[...new Array(this.countOfSpin)].reduce((promise, index) => {
    //   return promise.then(() => new Promise(resolve => {
    //     this.reels.forEach((_, reelIndex) => {
    //       setTimeout(() => {
    //         this.spinReel(reelIndex)
    //         resolve(void 0)
    //       }, reelIndex * 10)
    //     })
    //   }))
    // }, Promise.resolve())

  }

  private spinReel(reelIndex: number, spinDuration: number = 0.1): void {
    const reel = this._reels[reelIndex];
    const symbolHeight = 240; // Высота одного символа
    const reelHeight = 240 * 4; // Общая высота барабана

    reel.symbols.forEach(symbol => {
      gsap.to(symbol, {
        y: "+=" + symbolHeight, // Сдвиг вниз на высоту одного символа
        duration: spinDuration,
        ease: "power2.inOut",
        onComplete: () => {
          const symbol = reel.symbols.reduce((previousValue, currentValue) => {
            if (previousValue.y < currentValue.y) {
              return currentValue
            }
            return previousValue
          })
          // console.error(symbol)
          // symbol.y -= reelHeight; // Перемещаем символ в начало
          if (symbol.y >= reelHeight) {
            symbol.y -= reelHeight; // Перемещаем символ в начало
          }
        }
      });
    });
  }

  // public spinReel(reelIndex: number, spinDuration: number = 2): void {
  //   const reel = this._reels[reelIndex];
  //   const deltaY = 240
  //
  //   reel.symbols.forEach(symbol => {
  //     gsap.to(symbol, {
  //       y: symbol.y + deltaY,
  //       duration: spinDuration,
  //       ease: 'power2.inOut',
  //       onComplete: () => {
  //
  //       },
  //     });
  //   });
  // }
  get reels() {
    return this._reels
  }

  @computed
  get textures() {
    return this._textures.slice().sort(() => Math.random() - 0.5)
  }
  @action
  private getShuffledReelSymbols(textures: string[], x: number, y: number): ReelSymbolData[] {
    return textures.concat(textures[0]).slice()
      .sort(() => Math.random() - 0.5)
      .map((texture, i) => {
        const index = i - 1;
        return {
          x: x,
          y: y * i,
          texture,
        }
      })
  }

  wait(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

}

export const reelStore = new ReelStore(TEXTURES, COUNT_OF_REELS, REEL_CORDS)