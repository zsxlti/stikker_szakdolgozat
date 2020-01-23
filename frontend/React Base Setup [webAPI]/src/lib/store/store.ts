import { DeepPartial } from "./deep.partial";
import { Synchornizer } from "./synchronizer";
import { deepAssign } from "./deep.assign";

export abstract class Store<TState>
{
    constructor(private stateInternal: TState)
    {}

    private synchronizers: Synchornizer<any, any>[] = [];

    get state() : TState
    {
        return <TState>this.stateInternal;
    }

    getSynchronizer<P, S>(component: React.Component<P, S>)
    {
        const item = this.synchronizers.find(c => c.component === component);
        return <Synchornizer<S, TState>>item;
    }

    update(partialState: DeepPartial<TState>)
    {
        const newState = deepAssign(this.stateInternal, partialState);

        this.stateInternal = newState;

        this.synchronizers.forEach(p => p.signalUpdate(this.stateInternal, newState));
    }

    register<P, S>(component: React.Component<P, S>)
    {
        const sync = new Synchornizer<S, TState>(component);
        this.synchronizers.push(sync);
        return sync;
    }

    unregister(component: React.Component)
    {
        const item = this.synchronizers.find(c => c.component === component);

        if (item !== undefined)
        {
            this.synchronizers.remove(item);
        }
        else
        {
            console.log("unregister - no action performed, unknown component to remove.");
        }
    }
}