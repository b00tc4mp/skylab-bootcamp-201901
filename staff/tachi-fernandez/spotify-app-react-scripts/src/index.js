import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.0.0'


spotifyApi.token = 'BQDs-g5dB85U9mh4e86u8MD5sHky3rnGxN8RzXCWVcM3bTRjZTs2mcFBU8snHLKAyiPPLVy2By4CPXmirJ9fBXsLiiCtYFs3wx2qu9xHef7cqRisTeIoFVEHtR0mDm2gXaSFJAp0duk0fbWWP1k'


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
