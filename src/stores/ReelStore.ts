import { IReelData, IStore, ReelSymbolData } from '../interfaces/interfaces';
import { COUNT_OF_REELS, REEL_CORDS, TEXTURES } from '../constants/constants';
import { observable, action, makeAutoObservable } from 'mobx';
import { gsap } from "gsap";
import { Types } from '../types/types';
import { BlurFilter } from 'pixi.js';
import { injectable } from 'inversify';
import { UIStore } from './UIStore';
import { myContainer } from '../inversify.config';
import TextureName = Types.TextureName;
import { getShuffledReelSymbols } from '../functions/PureFunctions';

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
  public readonly _textures: TextureName[] = TEXTURES.slice()
  @observable
  private readonly _reels: IReelData[] = ReelStore.createReels(REEL_CORDS)

  @observable
  private _filters: BlurFilter[] = []
  private _filter: BlurFilter[] | null = null
  private _blurFilter = () => new BlurFilter(this.filterStrength)

  constructor() {
    makeAutoObservable(this, undefined, { deep: true })
  }

  public async update(state: Types.State): Promise<Types.State> {
    switch (state) {
      case 'SpinState':
        const uiStore = myContainer.get<UIStore>(Types.UIStore)
        await uiStore.update('SpinState')
        await this.spinReels()
        await uiStore.update('IdleState')
    }
    return Promise.resolve('NetworkState')
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

  private async spinReel(reelIndex: number,  spinDuration: number = 0.1): Promise<void> {
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
      const oldY = symbol.y
      gsap.to(symbol, {
        y: '+=' + y,
        duration: 0.4,
        ease,
        onComplete() {
          if (direction === 'down') {
            gsap.to(symbol, {
              y: '+=' + -y,
              duration: 0.2,
              ease: 'back.in',
              onComplete: () => {
                symbol.y = oldY
                onComplete()
              }
            })
          } else {
            gsap.to(symbol, {
              y: '+=' + y,
              duration: 0.2,
              ease: 'back.in',
              onComplete: () => {
                symbol.y = oldY
                onComplete()
              }
            })
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
      gsap.to(symbol, {
        y: "+=" + symbolHeight, // Shift down by one symbol height
        duration,
        ease: 'power1.inOut',
        repeat: 5,
        onComplete: () => {
          const symbol = reel.symbols.reduce((previousValue, currentValue) => {
            if (previousValue.y < currentValue.y) {
              return currentValue
            }
            return previousValue
          })
          if (symbol.y >= reelHeight) {
            symbol.y -= reelHeight; // Move the symbol to the beginning
            const [texture, index] = this.getRandomTexture()
            symbol.texture = texture
          }
          this.setSpinProgress(false)
          resolve()
        }
      })
    })

  }

  public get textures(): TextureName[] {
    return this._textures.slice().sort(() => Math.random() - 0.5)
  }

  private getRandomTexture(): Readonly<[TextureName, number]> | never {
    const textures = this.textures.slice().sort(() => Math.random() - 0.5)
    const texture = textures.shift()
    const index: number = this.textures.reduce((index, _, i) => {
      if (this._textures[i] === texture) {
        index = i
      }
      return index
    }, NaN)
    if (isNaN(index)) {
      throw new Error('symbol index can\'t be NaN')
    } else if (texture === undefined) {
      throw new Error('texture can\t be undefined')
    }
    return [texture, index]
  }

  get reels() {
    return this._reels
  }

  private static createReels({ x, y }: Types.PointCords): IReelData[] {
    return [...new Array(COUNT_OF_REELS)].map((_, reelId) => {
      return {
        x: x * reelId,
        symbols: getShuffledReelSymbols(TEXTURES.slice(), x * reelId, y, reelId),
        index: reelId,
        y: y * reelId,
      }
    })
  }
  @action
  private static getShuffledReelSymbols(textures: TextureName[], x: number, y: number, reelId: number): ReelSymbolData[] {
    return textures.concat(textures[0]).slice()
      .sort(() => Math.random() - 0.5)
      .map((texture, symbolId) => {
        return {
          reelId,
          symbolId,
          x: x,
          y: y * symbolId,
          texture,
          filter: null,
        }
      })
  }

  @observable
  get filters() {
    return this._filters
  }

  @observable
  get filter() {
    return this._filter
  }

  @action
  setSpinProgress = (isSpinProgress: boolean) => {
    this.isSpinProgress = isSpinProgress
    this.isIdle = !isSpinProgress
  }

}
