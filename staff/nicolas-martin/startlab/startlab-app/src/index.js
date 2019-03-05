import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/'
import './css/old.css'
import './css/index.css'
import { HashRouter } from 'react-router-dom'
import logic from './logic'

Object.defineProperties(logic, {
    
  __userApiToken__: {
      set(token) {
          sessionStorage.setItem('__userApiToken__', token)
      },

      get() {
          return sessionStorage.getItem('__userApiToken__')
      }
  },

  __isAdmin__: {
    set(isAdmin) {
        sessionStorage.setItem('__isAdmin__', isAdmin)
    },

    get() {
        return sessionStorage.getItem('__isAdmin__')
    }
}
})

ReactDOM.render(
    <HashRouter><App /></HashRouter>, document.getElementById('root')
)
