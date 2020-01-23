import * as iassign from "immutable-assign";
import "isomorphic-fetch";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "react-hot-loader/patch";
import { AppContainer } from "react-hot-loader";

import { Router } from "react-router";
import { createBrowserHistory } from "history";
import { AppRoutes } from "./routing/routes";

import { Extensions } from "./extensions";

import { AppStore } from "./lib/appStore";
import { StoreManager } from "./lib/store/store.manager";

const ext = Extensions;

iassign.setOption
({
  freeze: process.env.NODE_ENV !== "production",
  copyFunc: (value: any, propName: string) =>
  {
    if (value instanceof Map) {
      return new Map(value) as any;
    }

    return undefined;
  },
});

// Add ES6 Map support for redux-devtools-extension
// See: https://github.com/zalmoxisus/redux-devtools-extension/issues/124
if (process.env.NODE_ENV !== "production")
{
  require("map.prototype.tojson");
}

declare global
{
  interface Window
  {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")!;

const history = createBrowserHistory({ basename: baseUrl });
history.listen(_ =>
{
  window.scrollTo(0, 0);
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
})

const store = new AppStore();
StoreManager.setStore(store);

const container =
      <AppContainer>
          <Router history={ history }>
            <AppRoutes/>
          </Router>
      </AppContainer>

const ROOT = document.getElementById("root");

ReactDOM.render(container, ROOT);