import { myContainer } from '../inversify.config';
import { IFsm } from '../interfaces/interfaces';
import { StateTypes, Types } from '../types/types';
import { IStore } from '../interfaces/interfaces';
import { Graphics } from 'pixi.js';

export function throttle(func: Function, ms: number) {

  let isThrottled = false,
    savedArgs: any,
    savedThis: any

  function wrapper(this: any) {

    if (isThrottled) { // (2)
      savedArgs = arguments
      savedThis = this
      return;
    }

    func.apply(this, arguments)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }

  return wrapper
}

export const registerStates = (data: Types.RegisteredData) => {
  const FSM = myContainer.get<IFsm>(Types.FSM)
  data.forEach(({ storeName, state }) => {
    const store = myContainer.get<IStore>(Symbol.for(storeName))
    FSM.subscribe({ state, store })
  })
}

export const getBorderGraphic = (g: Graphics) => {
  g.clear();
  g.beginFill(0x00000, 1);
  g.drawRect(635, 740, 650, 50);
  g.endFill()
  return g
}

function transitToIdleState(state: Types.State): Types.State {
  return StateTypes.IDLE
}

function transitToSpinState(state: Types.State): Types.State {
  return StateTypes.SPIN
}