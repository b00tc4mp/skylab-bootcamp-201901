import React, { Component } from "react";
import { Route, Redirect, withRouter  } from "react-router-dom";
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
  render() {
    return (
      <div className="App">
        <Route path="/" render={() => this.state.token ? <Redirect to="/home/yourbooks" />: <Redirect to="/welcome" />}/>
        <Route exact path="/welcome" render = {() =>this.state.token ? <Home/> :<Welcome/> }/>
        <Route exact path="/login" render = {() =>this.state.token ? <Home/> :<Login/> }/>
        <Route exact path="/register" render = {() =>this.state.token ? <Home/> :<Register/> }/>
        <Route exact path="/home/yourbooks" render ={() => this.state.token ? <Books/> : <Redirect to="/welcome" /> }/>
        <Route exact path="/home/newbook" render ={() => this.state.token ? <Books/> : <Redirect to="/welcome" /> }/>
        <Route exact path="/home/updateuser" render ={() => this.state.token ? <UpdateUser/> : <Redirect to="/welcome" /> }/>
        <Route path="/home" render ={() => this.state.token ? <Home/> : <Redirect to="/welcome" /> }/>
      </div>
    );
  }
}

export default App;

