import React, { Component } from "react";
import { Route, Redirect, withRouter  } from "react-router-dom";
import './App.css';
import Welcome from '../src/components/welcome';
import Login from '../src/components/login';
import Home from '../src/components/home';
import logic from '../src/logic';

class App extends Component {

  state = {
    token: logic.getToken
  }
  render() {
    return (
      <div className="App"><Route path="/" render={() => this.state.token ? <Redirect to="/home" />: <Redirect to="/welcome" />}/>
        <Route exact path="/welcome" component = {Welcome} />
        <Route exact path="/login" component ={Login}/>
        <Route exact path="/home" render ={() => this.state.token ? <Home></Home> : <Redirect to="/welcome" /> }/>
      </div>
    );
  }
}

export default App;

