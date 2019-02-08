import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter} from 'react-router-dom'
import'./bulma/bulma.css'
import App from './components/App/App'
import logic from './components/Logic'

import * as serviceWorker from './serviceWorker'
import marvelApi from './marvel-api'

const { REACT_APP_MARVEL_API_KEY, REACT_APP_MARVEL_PRIVATE_API_KEY } = process.env
marvelApi.apiKey = REACT_APP_MARVEL_API_KEY

marvelApi.privateApiKey = REACT_APP_MARVEL_PRIVATE_API_KEY

logic.setUserId = id => id? sessionStorage.setItem('user-id', id) : sessionStorage.removeItem('user-id')
logic.getUserId = () => sessionStorage.getItem('user-id')
logic.setUserApiToken = token => token? sessionStorage.setItem('user-api-token', token) : sessionStorage.removeItem('user-api-token')
logic.getUserApiToken = () => sessionStorage.getItem('user-api-token')

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
