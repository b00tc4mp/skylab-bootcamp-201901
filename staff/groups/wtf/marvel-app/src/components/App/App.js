import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from '../Login'
import Register from '../Register'
import Landing from '../Landing'
// import Home from '../Home'



class App extends Component {

  state = {modalVisible: false, loginFeedback: null, registrationFeedback: null, userName: null, userEmail: null}

  // handleLogin = (email, password) =>{
  //   try {
  //       logic.login(email, password)
  //         .then(user => {
  //           this.setState({loginFeedback: null, userName : user.name, userEmail: user.username})
  //         })
  //       }catch ({message}) {
  //       this.setState({ loginFeedback: message })
  //   }
  // }

  // handleRegistration = (name, surname, email, password, passwordConfirmation) => {
  //     this.setState ({registrationFeedback: null})
  //     try {
  //         logic.register(name, surname, email, password, passwordConfirmation) 
  //             .then(()=>this.setState({modalVisible: true}))
  //     } catch ({message}) {
  //         this.setState ({registrationFeedback: message})
  //     }
  // }
  
  render() {
    return <BrowserRouter>
      <main>
        <Route exact path='/' component={Landing}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        {/* <Route path='/home' component={Home}/> */}
      </main>  
    </BrowserRouter>
  }
}

export default App
