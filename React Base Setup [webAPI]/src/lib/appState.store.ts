
export interface IAppState
{
    //readonly variableName: objectType;
    readonly message: string;
}

export const setIntitialAppState = (): IAppState =>
{
    const appState: IAppState =
    {
        message: "Hello from Store!"
    };

    return appState;
}

export const intitialAppState: IAppState = setIntitialAppState();
