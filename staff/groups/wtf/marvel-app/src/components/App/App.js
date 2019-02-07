import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Landing from '../Landing'
import Home from '../Home'
import Footer from '../Footer'
import logic from '../Logic'

class App extends Component {

  handleLogOut = () => {
    logic.logout()
    this.props.history.push('/')
  }

  componentWillMount() {
    this.props.history.listen(() => {
    if(this.props.location.pathname === '/' && logic.userLoggedIn) this.props.history.push('/home/search')
    });
  }

  render() {
    const { handleLogOut }= this
    
    return<main>
        <Route path='/' render={()=> <Landing/>}/>
        <Route path='/home/search' render={() => logic.userLoggedIn ? <Home onLogout={handleLogOut} /> : <Redirect to="/" />} />
        <Route path='/' render={()=> <Footer/>}/>
      </main>  
  }
}

export default withRouter(App)
