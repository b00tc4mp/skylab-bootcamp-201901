import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from '../Landing'
// import Home from '../Home'



class App extends Component {
  
  
  render() {
    return <BrowserRouter>
      <main>
        <Route path='/' component={Landing}/>
        {/* <Route path='/home' component={Home}/> */}
      </main>  
    </BrowserRouter>
  }
}

export default App
