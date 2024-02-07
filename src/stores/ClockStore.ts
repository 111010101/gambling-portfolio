import { IStore } from '../interfaces/interfaces';
import { Types, StateTypes } from '../types/types';
import { injectable } from 'inversify';
import { action, makeAutoObservable, observable, computed } from 'mobx';
import { Texture, Resource } from 'pixi.js';

type State = Types.State
type TimeMethod = 'getHours' | 'getMinutes' | 'getSeconds'
@injectable()
export class ClockStore implements IStore {


  @observable
  public textures: Texture<Resource>[] = []

  @observable
  public hourDigitOne: Texture = Texture.EMPTY
  @observable
  public hourDigitTwo: Texture = Texture.EMPTY

  @observable
  public minuteDigitOne: Texture = Texture.EMPTY
  @observable
  public minuteDigitTwo: Texture = Texture.EMPTY

  @observable
  public secondDigitOne: Texture = Texture.EMPTY
  @observable
  public secondDigitTwo: Texture = Texture.EMPTY

  constructor() {
    makeAutoObservable(this, undefined, { deep: true })
    //setTimeout(() => this.updateTime(), 500)
  }

  update(state: State): Promise<State> {
    return Promise.resolve(StateTypes.IDLE)
  }

  setTexture(textures: Texture<Resource>[]) {
    this.textures = textures
  }

  @action
  updateTime() {
    const hours = new Date().getHours().toLocaleString().padStart(2, '0')
    const minutes = new Date().getMinutes().toLocaleString().padStart(2, '0')
    const seconds = new Date().getSeconds().toLocaleString().padStart(2, '0')

    const [hourDigitOne, hourDigitTwo] = this.separateTime(hours)
    const [minuteDigitOne, minuteDigitTwo] = this.separateTime(minutes)
    const [secondDigitOne, secondDigitTwo] = this.separateTime(seconds)

    this.hourDigitOne = this.textures[hourDigitOne]
    this.hourDigitTwo = this.textures[hourDigitTwo]

    this.minuteDigitOne = this.textures[minuteDigitOne]
    this.minuteDigitTwo = this.textures[minuteDigitTwo];

    this.secondDigitOne = this.textures[secondDigitOne]
    this.secondDigitTwo = this.textures[secondDigitTwo]
    //setTimeout(() => this.updateTime(), 100)
  }


  @action
  private getNewTime(timeType: TimeMethod): [number, number] {
    const date = new Date()[timeType]().toLocaleString().padStart(2, '0')
    const [firsDigit, secondDigit] = this.separateTime(date)
    return [firsDigit, secondDigit]
  }

  @action
  private separateTime = (time: string): number[] => {
    return time.split('').map(Number)
  }

}