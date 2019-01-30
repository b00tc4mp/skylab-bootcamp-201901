import React from 'react';
import ReactDOM from 'react-dom';
import '../src/bulma/css/bulma.css';
import '../src/index.sass'
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api-1.0.0';

spotifyApi.token = 'BQBV1bz2BgrEEay1HqbIuqp4qr0E8w6Gyq33SPXVBtAJD_avsoVMk_CCrj6NJmXNWeKQThoBhVQSNUy6bEWPkJT7voLCoglfChCeb1Dx9_CwWOIQY7CUVC4kjVdDsB15FuXVcuqU0JFyVStWWQ';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
