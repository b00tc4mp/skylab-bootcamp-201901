import React, { Component } from 'react'
import { HashRouter, Route, Redirect } from 'react-router-dom'
import Landing from '../Landing'
import Home from '../Home'
import logic from '../Logic'

class App extends Component {

  handleLogOut = () => {
    logic.logout()

    this.props.history.push('/')
  }

  render() {
    const { handleLogOut }= this
    
    return <HashRouter>
      <main>
        <Route path='/' render={()=> logic.userLoggedIn ? <Redirect to="/home/search/"/> : <Landing/>}/>
        <Route path='/home/search/' render={() => logic.userLoggedIn ? <Home onLogout={handleLogOut} /> : <Redirect to="/" />} />
      </main>  
    </HashRouter>
  }
}

export default App
