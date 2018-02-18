import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';      // import para criar a store para os reducers.
import { applyMiddleware } from 'redux'; // import para aplicar os middlewares ao redux.
import { Provider } from 'react-redux';   // faz a integração do react com o redux

import promise from 'redux-promise';  // importando o middleware promise.
import multi from 'redux-multi';      // importando o middleware multi.
import thunk from 'redux-thunk';      // importando o middleware thunk.

import Routes from '../src/main/routes';
import reducers from './main/reducers';  // importando os reducers criados.

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools);//criando a store c os middlewares.

ReactDOM.render(
    /* O Provider engloba toda a aplicação e passa a store que é o estado único da aplicacao */
    <Provider store={ store } > 
        <Routes />
    </Provider>
    , document.getElementById("app")
)