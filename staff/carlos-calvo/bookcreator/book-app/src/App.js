import React, { Component } from "react";
import { Route, Redirect, withRouter, Switch  } from "react-router-dom";
import './App.css';
import Welcome from '../src/components/Welcome';
import Login from '../src/components/Login';
import Home from '../src/components/Home';
import Register from '../src/components/Register'
import logic from './logic'

class App extends Component {

  state = {
    token: logic.getToken
  }

  updateToken = () => this.setState({token : logic.getToken})
  

  render() {
    console.log(logic.isUserLoggedIn)
    console.log(logic.__userApiToken__)
    return (
      <div className="App">
        <Switch>
        <Route path exact="/" render={() => logic.isUserLoggedIn ? <Redirect to="/home" />: <Redirect to="/welcome" />}/>
        <Route path="/welcome" render = {() =>logic.isUserLoggedIn ? <Redirect to="/home" /> :<Welcome/> }/>
        <Route path="/login" render = {() =>logic.isUserLoggedIn ? <Redirect to="/home" /> :<Login updateToken = {this.updateToken}/> }/>
        <Route path="/register" render = {() =>logic.isUserLoggedIn ? <Redirect to="/home" /> :<Register/> }/>
        <Route path="/home" render ={() => logic.isUserLoggedIn ? <Home/> : <Redirect to="/welcome" /> }/>
        </Switch>
      </div>
      
    );
  }
}

export default withRouter(App);

