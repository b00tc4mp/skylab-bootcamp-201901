import React, { Component } from 'react';
/* import Home from '../Home' */
import Welcome from '../Welcome'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {

  state = { user: null }

  render() {

    const { state: { user } } = this

    return <BrowserRouter>
            <main className="app">
                {!user && <Welcome />}
                {/*user && <Home /> */}
            </main>
        </BrowserRouter>
  }
}

export default App
