import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

import spotifyApi from './spotify-api'

spotifyApi.token = 'BQCefg8XoHrTPgO6mJoeKBvHCCb6Byqj4poed5D04PsFBeZ26CT0Z2vRFYQE57NChbagsIdMsWyby6NB1yf1bMzXE-uDo3Vb0qnQTz4Z9GPsCaQlVdU-4EyM45DtdCpaPraKY5MNrqNo'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
