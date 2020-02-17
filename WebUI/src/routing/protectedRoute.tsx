import * as React from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route } from "react-router";

import { StorageService } from "./../services/client/storage.service";
import { StorageKeys } from "./../settings/constans";
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

        return storageService.read<string>(StorageKeys.JWT);
    }

    const isAuthenticated = (): boolean =>
    {
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
