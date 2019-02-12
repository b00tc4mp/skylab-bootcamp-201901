import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import spotifyApi from './spotify-api'
import logic from './logic'
import './index.sass'

// const { env: { REACT_APP_SPOTIFY_API_TOKEN } } = process // WARN this full destructuring does not work in react-scripts for no clear reason
const { REACT_APP_SPOTIFY_API_TOKEN } = process.env

spotifyApi.token = REACT_APP_SPOTIFY_API_TOKEN

Object.defineProperties(logic, {
    __userId__: {
        set(id) {
            sessionStorage.setItem('__userId__', id)
        },

        get() {
            return sessionStorage.getItem('__userId__')
        }
    },

    __userApiToken__: {
        set(token) {
            sessionStorage.setItem('__userApiToken__', token)
        },

        get() {
            return sessionStorage.getItem('__userApiToken__')
        }
    }
})

ReactDOM.render(<HashRouter><App /></HashRouter>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
