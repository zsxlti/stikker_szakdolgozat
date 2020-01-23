import * as React from "react";
import { Store } from "./store";
import { StoreManager } from "./store.manager";

export function Connected<
                            TReactComp extends new (...args: any[]) => React.Component<TProps, TState>,
                            TProps,
                            TState,
                            TStore extends Store<any>>(reactCompParam: TReactComp)
{
    return class extends reactCompParam
    {

        constructor(...args: any[])
        {
            super(...args)
            this.store = StoreManager.getStore<TStore>();
            this.store.register(this);
        }

        store : TStore = {} as TStore;

        componentWillUnmount()
        {
            this.store.unregister(this);
        }
    }
}