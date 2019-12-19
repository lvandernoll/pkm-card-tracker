import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import StateLoader from './stateLoader';
import * as reducers from './reducers';
import App from './App';
import 'styles/reset.css';
import 'index.scss';

const stateLoader = new StateLoader();

const reducer = combineReducers(reducers.default);
const enhancer = compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);
const store = createStore(reducer, stateLoader.loadState(), enhancer);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
