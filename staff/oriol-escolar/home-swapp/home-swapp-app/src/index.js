import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom'
import './index.sass';
import App from './components/App/';
import * as serviceWorker from './serviceWorker';
import logic from './logic'

logic.setUserApiToken = token => token? sessionStorage.setItem('homeSwapp-api-token', token) : sessionStorage.removeItem('homeSwapp-api-token')
logic.getUserApiToken = () => sessionStorage.getItem('homeSwapp-api-token')

ReactDOM.render(

<HashRouter>
    
<App />

</HashRouter>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
