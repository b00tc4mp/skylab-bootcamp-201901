import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import { HashRouter } from 'react-router-dom'

import logic from './logic'
import * as serviceWorker from './serviceWorker';

Object.defineProperties(logic, {
    __userApiToken__: {
        set(token) {
            sessionStorage.setItem('__userApiToken__', token)
        },

        get() {
            return sessionStorage.getItem('__userApiToken__')
        }
    }
})


ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
