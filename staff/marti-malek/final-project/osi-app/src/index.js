import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import App from './components/App';
import logic from './logic'
import './index.sass';

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