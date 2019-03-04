import React, { Component } from "react";
import { Route, Redirect, withRouter, Switch  } from "react-router-dom";
import './App.css';
import Welcome from '../src/components/welcome';
import Login from '../src/components/login';
import Home from '../src/components/home';
import logic from '../src/logic';
import Register from '../src/components/register'
import Books from '../src/components/books'
import UpdateUser from "./components/updateuser";

class App extends Component {

  state = {
    token: logic.getToken
  }

  updateToken = () => this.setState({token : logic.getToken})
  

  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path="/" render={() => this.state.token ? <Redirect to="/home" />: <Redirect to="/welcome" />}/>
        <Route path="/welcome" render = {() =>this.state.token ? <Redirect to="/home" /> :<Welcome/> }/>
        <Route path="/login" render = {() =>this.state.token ? <Redirect to="/home" /> :<Login updateToken = {this.updateToken}/> }/>
        <Route path="/register" render = {() =>this.state.token ? <Redirect to="/home" /> :<Register/> }/>
        <Route path="/home" render ={() => this.state.token ? <Home/> : <Redirect to="/welcome" /> }/>
        </Switch>
      </div>
    );
  }
}

export default App;

