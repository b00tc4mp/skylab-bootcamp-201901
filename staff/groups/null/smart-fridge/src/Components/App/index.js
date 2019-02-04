import React, { Component } from 'react';
import Home from '../Home'
import Welcome from '../Welcome'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {

  // state = { user: null }
  state = { user: {name: 'Daniel', surname:'toledo', username:'daniel.toledomonfort@gmail.com', gender: 'male'} }

  handleUser=(user)=> this.setState({user})

  render() {

    const { state: { user } } = this

    return <BrowserRouter>
            <main className="app">
                {!user && <Welcome getUser={this.handleUser} />}
                {user && <Home user={this.state.user}/>}
            </main>
        </BrowserRouter>
  }
}

export default App
