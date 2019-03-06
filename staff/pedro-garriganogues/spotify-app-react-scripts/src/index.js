import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import spotifyApi from './spotify-api/spotify-api-1.1.0';


spotifyApi.token = 'BQBUTthvZkiYHUSaRhwuSI1JpSTLZfNZTqbcF21x4NFYoSNKu-1Fl6o48Lk5nUKED2O1k-59-TyLnUK5WcBXUcT5mNNGLh11gz3SPKuQBMIkxvSamLhSEN9RaEJmGuE1_vv9azNit8lz8HGoZ8PKISa6C0aqndhNFQ'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
