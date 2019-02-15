import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './styles.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import thegamesDbApi from './thegamesdb-api';
import logic from './logic';

const { REACT_APP_THEGAMESDB_APIKEY } = process.env;
thegamesDbApi.apiKey = REACT_APP_THEGAMESDB_APIKEY;

logic.setUserId = id =>
    id ? sessionStorage.setItem('user-id', id) : sessionStorage.removeItem('user-id');
logic.getUserId = () => sessionStorage.getItem('user-id');

logic.setUserApiToken = token =>
    token
        ? sessionStorage.setItem('user-api-token', token)
        : sessionStorage.removeItem('user-api-token');
logic.getUserApiToken = () => sessionStorage.getItem('user-api-token');

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
