import * as React from "react";
import { Route } from "react-router-dom";
import { Urls } from "./urls";

import HomePage from "../pages/home/home";
import { ProtectedRoute } from "./protectedRoute";
import {ProtectedRouteProps} from "./protectedRouteProps";
import { AdminRoute } from "./adminRoute";
import StickersPage from "./../pages/stickers/stickers";

const defaultProtectedRouteProps: ProtectedRouteProps =
{
    authenticationPath: Urls.home
};

export const AppRoutes = () =>
    <React.Fragment>
        <Route exact path={ Urls.home } component={ HomePage } />
        <ProtectedRoute {...defaultProtectedRouteProps} exact path={ Urls.stickers } component={ StickersPage } />
        <AdminRoute {...defaultProtectedRouteProps} exact path={ Urls.addSticker } /*component={ AddStickerPage }*/ />
    </React.Fragment>
