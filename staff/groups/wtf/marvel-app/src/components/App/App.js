import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Landing from '../Landing'
// import Home from '../Home'



class App extends Component {
  


 
  render() {
    return <HashRouter>
      <main>
        <Route path='/' component={Landing}/>
        {/* <Route path='/home' component={Home}/> */}
      </main>  
    </HashRouter>
  }
}

export default App
