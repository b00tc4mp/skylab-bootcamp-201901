'use strict';

(() => {
    // const { BrowserRouter } = ReactRouterDOM
    const { HashRouter } = ReactRouterDOM
    const App = modules.import('app')

    // logic.storage = sessionStorage

    const mySuperMemStorage = {
        __store__ : {},

        setItem(key, value) {
            this.__store__[key] = value
        },

        getItem(key) {
            return this.__store__[key]
        },

        removeItem(key) {
            delete this.__store__[key]
        }
    }

    logic.storage = mySuperMemStorage

    // ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
    ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))
})()
