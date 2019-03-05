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
            sessionStorage.setItem('__coworkingApiToken__', token)
        },

        get() {
            return sessionStorage.getItem('__coworkingApiToken__')
        }
    }
})

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

serviceWorker.unregister();
