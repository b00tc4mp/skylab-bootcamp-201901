import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import App from './components/App';
// import * as serviceWorker from './serviceWorker';
import './index.sass';

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'));

// serviceWorker.unregister();
