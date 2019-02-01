import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api'

const { env: { REACT_APP_SPOTIFY_API_TOKEN } } = process

spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
