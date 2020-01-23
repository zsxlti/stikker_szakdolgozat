import * as iassign from 'immutable-assign';
import 'isomorphic-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';

import { Extensions } from './extensions';
import { App } from './pages/app';

const ext = Extensions;

iassign.setOption
({
  freeze: process.env.NODE_ENV !== 'production',
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
if (process.env.NODE_ENV !== 'production')
{
  require('map.prototype.tojson');
}

declare global
{
  interface Window
  {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const container =
      <AppContainer>
          <App />
      </AppContainer>

const ROOT = document.getElementById('root');

ReactDOM.render(container, ROOT);