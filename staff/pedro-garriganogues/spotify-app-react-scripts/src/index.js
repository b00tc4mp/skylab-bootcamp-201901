import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.1.0';


spotifyApi.token = 'BQBYlPtvKMttPgW1wiRfzgaadhK1Wkf91MEctRQxztvdp-f5UktdWLA7kcOzoy0UfEtDwEPOV1_ozYt8XL12I3b1_IScBSPrzGSAKNby70Jx-ugJ3KnFvqlCvClej-wvBWxfHB3phk3hmOiv0f07T-0buS39Ch14FQ'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
