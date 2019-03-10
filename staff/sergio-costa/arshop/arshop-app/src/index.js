import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './index.sass'
import App from './Components/App';
import * as serviceWorker from './serviceWorker';

import logic from './logic'

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

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))

serviceWorker.unregister();
