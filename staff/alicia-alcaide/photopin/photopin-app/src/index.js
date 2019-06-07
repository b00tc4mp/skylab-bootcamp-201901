import 'uikit'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom'
import logic from './logic'
import './index.css'
const normalize = require('photopin-normalize')


Object.defineProperties(logic, {

    __userToken__: {
        set(token) {
            sessionStorage.userToken = token
        },

        get() {
            return normalize.undefinedOrNull(sessionStorage.userToken)
        }
    }
})


ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()