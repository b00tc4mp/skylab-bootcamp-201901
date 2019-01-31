import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld'
import Feedback from './components/Feedback'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <HelloWorld name="Manuel" />

          <Feedback message="default feedback" />
          <Feedback message="warn feedback" level="warn" />
          <Feedback message="error feedback" level="error" />
          
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
