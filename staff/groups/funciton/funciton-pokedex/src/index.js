import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import './index.css';
import App from './App';
import logic from './logic'
import * as serviceWorker from './serviceWorker';

logic.setUserId = id => id? sessionStorage.setItem('user-id', id) : sessionStorage.removeItem('user-id')
logic.getUserId = () => sessionStorage.getItem('user-id')
logic.setUserApiToken = token => token? sessionStorage.setItem('user-api-token', token) : sessionStorage.removeItem('user-api-token')
logic.getUserApiToken = () => sessionStorage.getItem('user-api-token')

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

serviceWorker.unregister();
