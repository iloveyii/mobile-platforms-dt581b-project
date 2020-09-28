import '@babel/polyfill';
import React from 'react';
import {render} from 'react-dom';
import App from './components/App';

// Redux
import {applyMiddleware, compose, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';

// import(/* webpackChunkName : 'app' */ './Components/App')
//     .then(({default: App}) =>
//         render(<App/>, document.getElementById('root'))
//     );

render(<App/>, document.getElementById('root'))
