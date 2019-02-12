'use strict';

(() => {
    // const { BrowserRouter } = ReactRouterDOM
    const { HashRouter } = ReactRouterDOM
    const App = modules.import('app')

    logic.setUserId = id => id? sessionStorage.setItem('user-id', id) : sessionStorage.removeItem('user-id')
    logic.getUserId = () => sessionStorage.getItem('user-id')

    logic.setUserApiToken = token => token? sessionStorage.setItem('user-api-token', token) : sessionStorage.removeItem('user-api-token')
    logic.getUserApiToken = () => sessionStorage.getItem('user-api-token')

    // ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'))
    ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))
})()
