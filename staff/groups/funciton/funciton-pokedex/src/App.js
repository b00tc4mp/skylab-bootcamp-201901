import React, { Component } from "react";
import { Route, Redirect  } from "react-router-dom";

import "./App.css";


import logic from "./logic";
import Home from './components/Home'
import LoginPanel from "./components/Login";
import RegisterPanel from "./components/Register";
import Welcome from "./components/Welcome"



class App extends Component {

  state = {
    user: null,
    token: logic.getUserApiToken(),
    userId: logic.getUserId()
  }

  // componentWillMount(){
  //   this.setState({
  //     token : logic.getUserApiToken(),
  //     userId : logic.getUserId()
  //   }, () => {})
  // }



  render() {
    return (
      <div className="App"><Route exact path="/" render={() => this.state.userId ? <Redirect to="/welcome" />: <Redirect to="/home" />}/>
        <Route exact path="/home" component ={Home}/>      
        <Route exact path="/login" component ={LoginPanel}/>
        <Route exact path="/register" component = {RegisterPanel}/>
        <Route exact path="/welcome" component = {Welcome}/></div>

/* <Route exact path="/" render={() => logic.userLoggedIn ? <Redirect to="/home" /> : <Fragment><Link to="/login">Login</Link> or <Link to="/register">Register</Link></Fragment>}></Route> */
    );
  }
}

export default App;



function bindEvent(e, eventName, callback) {
  if (e.addEventListener) // new browsers
    e.addEventListener(eventName, callback, false);
  else if (e.attachEvent) // IE
    e.attachEvent('on' + eventName, callback);
};

bindEvent(document.body, 'scroll', function (e) {
  document.body.scrollLeft = 0;
})