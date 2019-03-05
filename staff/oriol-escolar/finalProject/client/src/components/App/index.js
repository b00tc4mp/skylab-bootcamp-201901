import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom'
import logo from '../../logo.svg';
import './index.sass';
import Login from '../loginPanel'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Login> </Login>
        </header>
      </div>
    );
  }
}

export default App;
