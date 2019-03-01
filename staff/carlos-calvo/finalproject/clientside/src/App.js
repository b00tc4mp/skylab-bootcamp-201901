import React, { Component } from "react";
import { Route  } from "react-router-dom";
import './App.css';
import Welcome from '../src/components/welcome';
import Login from '../src/components/login';
import Carrousel from '../src/components/carrousel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component = {Welcome} />
      </div>
    );
  }
}

export default App;

