import { IStore } from '../interfaces/interfaces';
import { Types } from '../types/types';
import { injectable } from 'inversify';
import { action, makeAutoObservable, observable } from 'mobx';
import { winCombinations } from '../constants/constants'
import SymbolData = Types.SymbolData;
type RangeToFour = Types.RangeToFour
type Symbols = Types.Symbols
@injectable()
export class NetworkStore implements IStore {

  @observable
  private reelIndexWin: RangeToFour = 0

  @observable
  private readonly winCombinations = Object.values(winCombinations)

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
    //this.increment()
  }

  async update(state: Types.State): Promise<Types.State> {
    this.increment()
    switch (state) {
      case 'NetworkState':
        break;
      default:
        throw new Error(`${state} doesn'\t exist`)
    }
    return Promise.resolve('IdleState')
  }

   async *generateSequence() {

   }

  @action
  private increment(): number {
    if (this.reelIndexWin < 2) {
      ++this.reelIndexWin
    } else {
      this.reelIndexWin = 1
    }
    return this.reelIndexWin
  }


  public get getWinCombination(): SymbolData {
    return this.winCombinations[1]
  }


}
