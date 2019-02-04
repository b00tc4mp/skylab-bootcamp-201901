import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import omdbApi from './ombd-api'
import { HashRouter } from 'react-router-dom'


const { OMDB_KEY } = process.env

omdbApi.key = OMDB_KEY

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
