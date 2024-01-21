import { myContainer } from '../inversify.config';
import { IFsm } from '../interfaces/interfaces';
import { StateTypes, Types } from '../types/types';
import { IStore } from '../interfaces/interfaces';
import { Graphics } from 'pixi.js';

export const registerStates = (data: Types.RegisteredData) => {
  const FSM = myContainer.get<IFsm>(Types.FSM)
  data.forEach(({ storeName, state }) => {
    const store = myContainer.get<IStore>(Symbol.for(storeName))
    FSM.subscribe({ state, store })
  })
}

export const borderGraphic = (g: Graphics) => {
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