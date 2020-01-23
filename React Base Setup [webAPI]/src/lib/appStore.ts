import { Store } from "./store/store";
import { IAppState, intitialAppState } from "./appState.store";

export class AppStore extends Store<IAppState>
{
    constructor(appState = intitialAppState)
    {
        super(appState);
    }
}