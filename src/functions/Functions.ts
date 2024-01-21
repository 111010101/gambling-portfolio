import { myContainer } from '../inversify.config';
import { IFsm } from '../interfaces/interfaces';
import { StateTypes, Types } from '../types/types';
import { IStore } from '../interfaces/interfaces';


export const registerStates = (data: Types.RegisteredData) => {
  const FSM = myContainer.get<IFsm>(Types.FSM)
  data.forEach(({ storeName, state }) => {
    const store = myContainer.get<IStore>(Symbol.for(storeName))
    FSM.subscribe({ state, store })
  })
}

function transitToIdleState(state: Types.State): Types.State {
  return StateTypes.IDLE
}

function transitToSpinState(state: Types.State): Types.State {
  return StateTypes.SPIN
}