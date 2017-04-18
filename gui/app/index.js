import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

require('../assets/vendor/normalize.min.css');
require('../assets/fonts/font-Gotham/gotham.scss');


// For IE11
import Promise from 'promise-polyfill';

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

import Routes from './routes';
import Reducers from './reducers';

/**
 * This file is meant to render the application onto the webview
 * It is the entry point for the front-end and webpack
 */

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

/**
 * Root component to be rendered
 */
const Root = function() {
  return (
    <Provider store={createStoreWithMiddleware(Reducers)}>
      <Router history={browserHistory} routes={Routes}/>
    </Provider>
  );
};

const root = document.getElementById('root');
ReactDOM.render(<Root/>, root);
