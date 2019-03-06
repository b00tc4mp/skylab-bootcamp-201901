import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './sass/main.scss';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import auth from './services/auth';

Object.defineProperties(auth, {
	__user__: {
		set(user) {
			sessionStorage.setItem('__user__', user);
		},

		get() {
			return sessionStorage.getItem('__user__');
		},
	},

	__userApiToken__: {
		set(token) {
			sessionStorage.setItem('__userApiToken__', token);
		},

		get() {
			return sessionStorage.getItem('__userApiToken__');
		},
	},
});

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
