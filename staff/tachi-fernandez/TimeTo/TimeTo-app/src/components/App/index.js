import React, { Component } from 'react';
import { Route, Redirect, withRouter,Switch } from 'react-router-dom' 
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import EventsByCategory from '../Events-by-category'
import EventById from '../Event-by-id'
import CreateEvent from '../CreateEvent'
import Header from '../Header';
import Footer from '../Footer';
import logic from '../../logic/index'
import User from '../User';
import UserModify from '../User-modify'
import RedirectLoginOrRegister from '../Redirect-Login-or-Register';
import UserById from '../User-by-id'
import Results from '../Results';
import Events from '../Events';
import { debug } from 'util';
import Feedback from '../Feedback'


class App extends Component {
  state = {loginFeedback: null , registerFeedback : null}
  handleRegister = (name, surname, age, description, email, password, passwordConfirmation) => {
    try {
        logic.registerUser(name, surname, age, description, email, password, passwordConfirmation)
        .then( () => {
          this.props.history.push('/login')
          alert('you have successfully registered')
          
        })
        .catch( ({message}) => {
          console.log(message)
          this.setState({ registerFeedback: message })
      })
    }catch ({message}){ 
      console.log(message)
      this.setState({ registerFeedback: message })


    }
  }

  handleLogin = (email,password) => {
    try{
      debugger
      logic.logInUser(email,password)
        .then( () => {            
          debugger
            this.props.history.push('/home') 
            alert('you have successfully login')
            this.setState({ loginFeedback: null })
        }).catch( ({message}) => {
            console.log(message)
            this.setState({ loginFeedback: message })
            

        })

    }catch({message}){
      this.setState({ loginFeedback: message })
    }
  }

  handleCreateEvent = (title, description, date, ubication, category) => {
    try {
      debugger
        logic.createEvent(title, description, date, ubication, category)
        .then( () => {
          this.props.history.push('/home')
          alert('you have successfully create event')
          
        })
        .catch(({message}) =>{
          this.setState({registerFeedback: message})
        })
    }catch ({message}){ 
      this.setState({registerFeedback: message})
    }
  }

  //render={() => logic.isUserLoggedIn ? <Results /> : <Redirect to ='/login-or-register' 
 

    render() {
      const  {handleRegister,handleLogin,handleCreateEvent , state:{loginFeedback,registerFeedback}} = this
    return (  
    <section className="App">
        <Header />
        <Switch>
            <Route path='/home' component={Home} />
            <Route exact path='/category/:categoryId' component={EventsByCategory} />
            <Route path='/results/:query'  component={Results}   />
            <Route path='/event/:eventId' component={EventById} />
            <Route path= '/user' render={() => logic.isUserLoggedIn ? <User  />:  '' }  />
            <Route path= '/user-modify' render={() => logic.isUserLoggedIn ? <UserModify /> : ''} />
            <Route path= '/my-events' render={() => logic.isUserLoggedIn ? <Events  />:  '' }  />
            <Route path='/register' render={props => !logic.isUserLoggedIn? <Register onRegister={handleRegister} feedback={registerFeedback}/> : <Redirect to = '/home'/>} /> 
            <Route path='/login' render={props => !logic.isUserLoggedIn? <Login onLogin={handleLogin} feedback={loginFeedback} />  : <Redirect to  = '/home' /> } />
            <Route path= '/login-or-register' render={() => <RedirectLoginOrRegister />} />
            <Route path='/create-event' render={props => logic.isUserLoggedIn ? <CreateEvent onCreateEvent={handleCreateEvent}/> : <Redirect to ='/register' />} />
            {/* <Route path= '/results/:query' render={() => <Results /> } /> */}
            <Route path='/:userId' render={() => <UserById /> } />
            <Route exact path= '/' render={()=> <Redirect to='/home' />} />
        </Switch>
        <Footer />
    </section>
   
    );
  }
}

export default withRouter(App);
