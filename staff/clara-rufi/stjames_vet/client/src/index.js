import React from 'react'
import ReactDOM from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import logic from './logic'
import './index.sass'



Object.defineProperties(logic, {
    __userId__: {
        set(id) {
            sessionStorage.setItem('__userId__', id)
        },

        get() {
            return sessionStorage.getItem('__userId__')
        }
    },
    __userToken__: {
        set(token) {
            sessionStorage.setItem('__userToken__', token)
        },

        get() {
            return sessionStorage.getItem('__userToken__')
        }
    }
})

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
