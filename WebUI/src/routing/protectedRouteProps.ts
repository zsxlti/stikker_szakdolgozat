import { RouteProps } from "react-router";

export interface ProtectedRouteProps extends RouteProps
{
    authenticationPath: string;
}