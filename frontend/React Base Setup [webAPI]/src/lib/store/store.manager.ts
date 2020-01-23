import { Store } from "./store";

export  class StoreManager
{
    static globalStore : Store<any> | undefined;

    static setStore(store: Store<any>)
    {
        this.globalStore = store;
    }

    static getStore<T extends Store<any>>() : T
    {
        return this.globalStore as T;
    }
}