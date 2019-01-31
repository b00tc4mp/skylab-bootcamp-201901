import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.0.0'


spotifyApi.token = 'BQDVOEm40jkAaoDpkkKZVodO8qJ7S34TNeK9MqTAsFHTOS8VsmWTKVDPjiLulUvVcH2j93tM5KD-KwRAa5fesQ4aqhEDJ6JY3vpQPdROK2GUlH6v1QFfVwuVB1iQlP7G5kcKHYCWdakEzYEsCUg'


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
