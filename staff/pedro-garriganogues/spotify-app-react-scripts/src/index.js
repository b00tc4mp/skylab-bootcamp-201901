import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api/spotify-api-1.1.0';


spotifyApi.token = 'BQAVSTyrC-XyXF8ZONG3-meaZALBHeDg7kInHenQEMXGZRhbBBgcoN0mPH-QsExFQnxEZajjqx2190UXu8CMst0IMghy0NbdzKf3F-zwk-T2OEB4OC8gUpulqAxAxBZz-9eig-S7TvvTjdtgbHeE_iAeVfXkqFQITQ'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
