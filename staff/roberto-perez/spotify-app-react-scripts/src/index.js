import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './components/App';
import spotifyApi from './spotify-api-1.0.0';
import * as serviceWorker from './serviceWorker';

spotifyApi.token =
  "BQCyUsaqPgKr5dufVE98NLp71a0goPfVRsh91rvckaa9YGo1KwQfkai7BIrilZ3Vm-9UIq9oLd7GOA4Nbx8KQx64BexdYwFBVSHNQdmQwvZsKq-aRn-H92InGk4q3g6DPm1z0cUBIVx2SA";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
