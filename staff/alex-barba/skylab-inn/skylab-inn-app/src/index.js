import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/App';
import * as serviceWorker from './serviceWorker'

// import './index.sass'
import logic from './logic'

Object.defineProperties(logic, {

    __userApiToken__: {
        set(token) {
            token ? sessionStorage.setItem('__userApiToken__', token) : sessionStorage.removeItem('__userApiToken__')
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
