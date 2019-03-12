import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import logo from '../../logo.svg';
import './index.sass';
import Login from '../loginPanel'
import Register from '../registerPanel'
import LandingPage from '../LandingPage'
import Header from '../Header'
import logic from '../../logic'


class App extends Component {
  state = { token : "", user: "", loginFeedback: null, registerFeedback: null, registered: "" }


  handleLogin = (email, password) => {

    try {
      return logic.loginUser(email, password)
        .then((token) => {

          this.setState({ token })
          return logic.retrieveUser()
            .then(user => this.setState({ user }))
            .catch(({message}) => {
              this.setState({ loginFeedback: message })
            })
          .then(() => this.props.history.push('/'))
        })
        .catch(({ message }) => {
          this.setState({ loginFeedback: message })
        })
    } catch ({ message }) {
      this.setState({ loginFeedback: message })
    }
  }

  handleRegister = (username, email, password, passwordConfirm) => {

    try {
      return logic.registerUser(username, email, password, passwordConfirm)
        .then(() => {
          
          this.setState({ registered: 'yes' })
          this.props.history.push('/login')
      
      
      
      })
        .catch(({message}) => {
          this.setState({ registerFeedback: message })
        })
    } catch ({ message }) {
      this.setState({ registerFeedback: message })
    }
  }

  //#region  Header Functions 
  
  
  handleGoToLogout = () => {
    logic.logout();
    this.setState({ user: "" , token:"" })

    // this.props.history.push('/');
  }

  handleGoToRegister= ()=>{

    this.props.history.push('/register');

  }

  handleGoToLogin= ()=>{

    this.props.history.push('/login');

  }
  handleGoToLanding= ()=>{

    this.props.history.push('/');

  }
  handleGoToUser= ()=>{

    this.props.history.push('/user');

  }
  handleGoToConversations= ()=>{

    this.props.history.push('/conversations');

  }



//#endregion

  render() {

    const { handleLogin, handleRegister,handleGoToConversations,handleGoToLogin,handleGoToLogout,handleGoToRegister,handleGoToUser,handleGoToLanding, state: { user, loginFeedback, registerFeedback, registered } } = this


    return (


      <div className="App">
        <div className="navbar">
          <Header user={user} handleGoToConversations={handleGoToConversations} handleGoToLogin={handleGoToLogin} handleGoToLogout={handleGoToLogout} handleGoToRegister={handleGoToRegister} handleGoToUser={handleGoToUser} handleGoToLanding={handleGoToLanding} ></Header>

        </div>

        <div className="content" >
          {/* <Route  exact path = '/' render={() => <LandingPage/>}/>  */}
          
          <Route  exact path ="/login" render={()=> <Login loginFeedback={loginFeedback} onLogin={handleLogin}  />}/> 
          <Route  exact path ="/register" render={()=> <Register registerFeedback={registerFeedback} onRegister={handleRegister}/>}/> 

        </div>


      </div>
    );
  }
}

export default withRouter(App) ;
