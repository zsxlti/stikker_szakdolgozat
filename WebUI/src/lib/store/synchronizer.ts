
export class Synchornizer<TState, TAppState>
{
    constructor(component: React.Component<any, any>)
    {
        this.component = component;
    }

    component: React.Component<any, any>;
    triggeFunc = [] as ((appSate: TAppState) => any)[];
    mapFunc = (appSate: TAppState) => ({} as Partial<TState>);

    map(map: (appSate: TAppState) => Partial<TState>, ...trigger: ((appSate: TAppState) => any)[])
    {
        this.mapFunc = map;
        this.triggeFunc = trigger;
    }

    signalUpdate(oldState: TAppState, newState: TAppState)
    {
        const changed =
            this.triggeFunc.length === 0 ||
            this.triggeFunc.findIndex(prop => prop(<TAppState>oldState) !== prop(<TAppState>newState)) > -1;

        if (changed)
        {
            const newMap = this.mapFunc(newState);
            this.component.setState({ ...newMap });
        }
    }
}