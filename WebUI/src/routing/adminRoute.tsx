import * as React from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route } from "react-router";
import * as jwt_decode from "jwt-decode";

import { StorageService } from "../services/client/storage.service";
import { StorageKeys } from "../settings/constans";
import { ProtectedRouteProps } from "./protectedRouteProps";

/*
usege: <ProtectedRoute {...defaultProtectedRouteProps} exact={true} path="/" component = { ProtectedContainer } />
use it in route.tsx
*/

export function AdmindRoute(props: ProtectedRouteProps)
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

    const isAdmin = () : boolean =>
    {
        const token: string | undefined = getToken();

        if (token === undefined || token === null)
        {
            return false;
        }

        const userInfoJSON = JSON.parse(JSON.stringify(getDecodedAccessToken(token)));
        const roles: any[] = userInfoJSON.auth;

        if (roles.toEnum().Any(x => x.authority === "ROLE_ADMIN"))
        {
            return true;
        }
        
        const storageService: StorageService = new StorageService();
        storageService.remove(StorageKeys.JWT)
        return false;
    }

    const getDecodedAccessToken = (token: string) =>
    {
        try
        {
            return jwt_decode(token);
        }
        catch (error)
        {
            return null;
        }
      }

    if (!isAdmin())
    {
        return <Redirect to={{ pathname: props.authenticationPath }}/>;
    }
    else
    {
        return <Route {...props}/>;
    }
}
