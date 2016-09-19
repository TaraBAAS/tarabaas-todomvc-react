import 'isomorphic-fetch';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import App from './containers/App';
import reducer from './reducers';
import 'todomvc-app-css/index.css';

const store = createStore(
  reducer,
  {},
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(browserHistory)
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/:projectId" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
