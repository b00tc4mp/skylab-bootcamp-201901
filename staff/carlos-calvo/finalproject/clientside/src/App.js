import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from '../src/components/header';
import Carrousel from '../src/components/carrousel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Carrousel></Carrousel>
      </div>
    );
  }
}

export default App;
