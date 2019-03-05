import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom' 
import Login from '../Login'
import Register from '../Register'
import Home from '../Home'
import CreateEvent from '../CreateEvent'
import Header from '../Header';
import Footer from '../Footer';
import logic from '../../logic/index'


class App extends Component {

  handleRegister = (name, surname, age, description, email, password, passwordConfirmation) => {
    try {
        logic.registerUser(name, surname, age, description, email, password, passwordConfirmation)
        .then( () => {
          this.props.history.push('/login')
          alert('you have successfully registered')
          
        })
        .catch(({message}) =>{
          this.setState({registerFeedback: message})
        })
    }catch ({message}){ 
      this.setState({registerFeedback: message})
    }
  }

  handleLogin = (email,password) => {
    try{

      logic.logInUser(email,password)
        .then( () => {            
            this.props.history.push('/home') 
            alert('you have successfully login')
        }).catch( ({message}) => {
            this.setState({ loginFeedback: message })
        })

    }catch({message}){
      this.setState({ loginFeedback: message })
    }
  }

  handleCreateEvent = (title, description, date, ubication, category) => {
    try {
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

    render() {
      const  {handleRegister,handleLogin,handleCreateEvent} = this
    return (  
    <section className="App">
        <Header />
        <Route path='/home' component={Home} />
        <Route path='/register' render={props => <Register onRegister={handleRegister}/>} />
        <Route path='/login' render={props => <Login onLogin={handleLogin}/>} />
        <Route path='/create-event' render={props => <CreateEvent onCreateEvent={handleCreateEvent}/>} />
        <Route exact path= '/' render={()=> <Redirect to='/home' />} />
        <Footer />
    </section>

//  <Route path="/search/:query/artist/:artistId" render={props => 
// <AlbumResults artistId={props.match.params.artistId}
//  onAlbumSelected={handleAlbumSelected} />} />       


    );
  }
}

export default withRouter(App);
