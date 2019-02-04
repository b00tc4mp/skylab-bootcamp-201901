import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Landing from '../Landing'
import Home from '../Home'
import logic from '../Logic'
import Login from '../Login';



class App extends Component {
  state = { loginFeedback: null, user: null }

  render() {
    
    const { state: user} = this

    return <HashRouter>
      <main>
        <Route path='/' component={Landing}/>
        {user && <Route path='/home' component={Home}/>}
      </main>  
    </HashRouter>
  }
}

export default App
