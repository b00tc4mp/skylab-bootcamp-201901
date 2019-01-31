import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.1.0';
import './vendor/bootstrap/4.1.3/css'

spotifyApi.token = 'BQCf38W4ZZQUbuJm94L3IJ_cOamslU7Ba-rXb62xFgJP6e4Pxvmb2vtcGD2U_94dgqm_4YLlYi_9Z4pDrKf724hegG4isZSoqlgtG48FNStXcX4WmJ5wVSZOjyc6WMKASSV1S8vYDNjJ5iPFxAsSI2doLco5PBlq4A'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
