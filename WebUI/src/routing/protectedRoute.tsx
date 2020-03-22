import * as React from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route } from "react-router";

import { StorageService } from "./../services/client/storage.service";
import { StorageKeys } from "./../settings/constants";
import { ProtectedRouteProps } from "./protectedRouteProps";

/*
usage: <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path="/" component = { ProtectedContainer } />
use it in route.tsx
*/

export function ProtectedRoute(props: ProtectedRouteProps)
{
    const location = useLocation();
    if (props.path !== location.pathname)
    {
        return null;
    }
   

    const getToken = (): string | undefined =>
    {
        const storageService: StorageService = new StorageService();

        const token : string | undefined = storageService.read<string>(StorageKeys.JWT);
        return token ? token : undefined;
    }

    const isAuthenticated = (): boolean =>
    {
        //TODO:debug
        const token: string | undefined = getToken();

        if (token === undefined || token === null)
        {
            return false;
        }

        return true;
    }

    if (!isAuthenticated())
    {
        return <Redirect to={{ pathname: props.authenticationPath }}/>;
    }
    else
    {
        return <Route {...props}/>;
    }
}
