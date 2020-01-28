import * as React from "react";
import { Route } from "react-router-dom";
import { Urls } from "./urls";

import HomePage from "../pages/home/home";
import { ProtectedRouteProps, ProtectedRoute } from "./protectedRoute";

const defaultProtectedRouteProps: ProtectedRouteProps =
{
    authenticationPath: "/login"
};

export const AppRoutes = () =>
    <React.Fragment>
        <Route exact path={ Urls.home } component={ HomePage } />
    </React.Fragment>
