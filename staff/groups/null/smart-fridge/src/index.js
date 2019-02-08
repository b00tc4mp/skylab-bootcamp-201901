import React from 'react';
import ReactDOM from 'react-dom';
import logic from './logic'
import './index.sass';
import App from './Components/App';
import { HashRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';




logic.setUserId = id => id? sessionStorage.setItem('user-id', id) : sessionStorage.removeItem('user-id')
logic.getUserId = () => sessionStorage.getItem('user-id')

logic.setUserApiToken = token => token? sessionStorage.setItem('user-api-token', token) : sessionStorage.removeItem('user-api-token')
logic.getUserApiToken = () => sessionStorage.getItem('user-api-token')

logic.setUser = user => user? sessionStorage.setItem('user', JSON.stringify(user)) : sessionStorage.removeItem('user')
logic.getUser = () => sessionStorage.getItem('user')


ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))


serviceWorker.unregister();
