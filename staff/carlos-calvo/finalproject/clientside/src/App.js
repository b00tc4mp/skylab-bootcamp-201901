import React, { Component } from "react";
import { Route, Redirect, withRouter  } from "react-router-dom";
import './App.css';
import Welcome from '../src/components/welcome';
import Login from '../src/components/login';
import Home from '../src/components/home';
import logic from '../src/logic';
import Register from '../src/components/register'
import Books from '../src/components/books'

class App extends Component {

  state = {
    token: logic.getToken
  }
  render() {
    return (
      <div className="App">
        <Route path="/" render={() => this.state.token ? <Redirect to="/home/yourbooks" />: <Redirect to="/welcome" />}/>
        <Route exact path="/welcome" render = {() =>this.state.token ? <Home></Home> :<Welcome/> }/>
        <Route exact path="/login" render = {() =>this.state.token ? <Home></Home> :<Login/> }/>
        <Route exact path="/register" render = {() =>this.state.token ? <Home></Home> :<Register/> }/>
        <Route exact path="/home/yourbooks" render ={() => this.state.token ? <Books/> : <Redirect to="/welcome" /> }/>
        <Route exact path="/home" render ={() => this.state.token ? <Home/> : <Redirect to="/welcome" /> }/>
      </div>
    );
  }
}

export default App;

