import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import App from './containers/App';
import reducer from './reducers';
import 'todomvc-app-css/index.css';

const store = createStore(
  reducer,
  {},
  compose(
    applyMiddleware(
      thunkMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
