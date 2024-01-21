import "reflect-metadata";
import { FSM } from './FSM/FSMObserber';
import { Container } from 'inversify';
import { Types } from './types/types';
import { UIStore } from './stores/UIStore';
import { ReelStore } from './stores/ReelStore';
import { IFsm } from './interfaces/interfaces';

const myContainer = new Container();
myContainer.bind<IFsm>(Types.FSM).to(FSM)
myContainer.bind<UIStore>(Types.UIStore).to(UIStore);
myContainer.bind<ReelStore>(Types.ReelStore).to(ReelStore)

export { myContainer }
