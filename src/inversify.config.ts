import "reflect-metadata";
import { FSM } from './FSM/FSMObserber';
import { Container } from 'inversify';
import { Types } from './types/types';
import { UIStore } from './stores/UIStore';
import { ReelStore } from './stores/ReelStore';
import { WinLineStore } from './stores/WinLineStore';
import { IFsm } from './interfaces/interfaces';
import { NetworkStore } from './stores/NetworkStore';
import { ClockStore } from './stores/ClockStore';

const myContainer = new Container();
myContainer.bind<NetworkStore>(Types.NetWorkStore).to(NetworkStore).inSingletonScope();
myContainer.bind<WinLineStore>(Types.WinLineStore).to(WinLineStore).inSingletonScope()
myContainer.bind<ReelStore>(Types.ReelStore).to(ReelStore).inSingletonScope()
myContainer.bind<IFsm>(Types.FSM).to(FSM).inSingletonScope()
myContainer.bind<UIStore>(Types.UIStore).to(UIStore).inSingletonScope();
myContainer.bind<ClockStore>(Types.ClockStore).to(ClockStore).inSingletonScope();

export { myContainer }
