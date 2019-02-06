import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'

import './index.sass';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import omdbApi from './ombd-api'
import logic from './logic'

logic.setUserId = id => id? sessionStorage.setItem('user-id', id) : sessionStorage.removeItem('user-id')
logic.getUserId = () => sessionStorage.getItem('user-id')

logic.setUserApiToken = token => token? sessionStorage.setItem('user-api-token', token) : sessionStorage.removeItem('user-api-token')
logic.getUserApiToken = () => sessionStorage.getItem('user-api-token')


const { OMDB_KEY } = process.env

omdbApi.key = OMDB_KEY

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
