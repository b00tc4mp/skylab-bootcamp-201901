import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import logic from './logic'

const token = sessionStorage.getItem('freendies-user-token')
if (token) {
    logic.setUserApiToken(token)
}

ReactDOM.render(
    <HashRouter>

        {<App token={token} />}

    </HashRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
