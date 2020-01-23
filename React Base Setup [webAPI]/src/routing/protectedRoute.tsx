import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { StorageService } from "./../services/client/storage.service";
import { StorageKeys } from "./../settings/constats";

export interface ProtectedRouteProps extends RouteProps
{
    authenticationPath: string;
}

/*
usege: <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path="/" component = { ProtectedContainer } />
use it in route.tsx
*/

export class ProtectedRoute extends Route<ProtectedRouteProps>
{
    public render()
    {
        let redirectPath: string = "";

        const isAuthenticated = this.isAuthenticated()

        if (isAuthenticated)
        {
            redirectPath = this.props.authenticationPath;
        }

        if (redirectPath)
        {
            const renderComponent = () => (<Redirect to={{ pathname: redirectPath }}/>);
            return <Route {...this.props} component={ renderComponent } render={undefined}/>;
        }
        else
        {
            return <Route {...this.props}/>;
        }
    }

    private getToken() : string | undefined
    {
        const storageService: StorageService = new StorageService();

        return storageService.read(StorageKeys.JWT);
    }

    private isAuthenticated = () : boolean =>
    {
        const token: string | undefined = this.getToken();

        if (token === undefined || token === null)
        {
            return false;
        }

        return true;
    }
}