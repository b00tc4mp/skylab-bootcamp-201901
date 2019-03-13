import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './index.sass';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import logic from './logic'

Object.defineProperties(logic, {

    __coworkingApiToken__: {
        set(token) {
            token ? sessionStorage.setItem('__coworkingApiToken__', token) : sessionStorage.removeItem('__coworkingApiToken__')
        },

        get() {
            return sessionStorage.getItem('__coworkingApiToken__')
        }
    },

    __isAdmin__: {
        set(isAdmin) {
            isAdmin ? sessionStorage.setItem('__isAdmin__', isAdmin) : sessionStorage.removeItem('__isAdmin__')
        },

        get() {
            return sessionStorage.getItem('__isAdmin__')
        }
    }
})

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

serviceWorker.unregister();
