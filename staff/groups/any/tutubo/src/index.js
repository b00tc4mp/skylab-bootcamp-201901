import React from 'react';
import ReactDOM from 'react-dom';
import './vendor/bulma/0.7.2/bulma.sass'
import './index.sass';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom'
import logic from './logic';

logic.storage = sessionStorage

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

serviceWorker.unregister();
