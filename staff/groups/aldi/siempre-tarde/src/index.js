import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './componets/App';
import * as serviceWorker from './serviceWorker';
import transitApi from './data/transit-api';
import iBusApi from './data/ibus-api';
import { HashRouter as Router } from 'react-router-dom'


transitApi.APP_ID = process.env.REACT_APP_APP_ID
transitApi.APP_KEY = process.env.REACT_APP_APP_KEY

iBusApi.APP_ID = process.env.REACT_APP_APP_ID
iBusApi.APP_KEY = process.env.REACT_APP_APP_KEY

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//Pg 19 manual: The road to learn React
if (module.hot) {
    module.hot.accept();
}
