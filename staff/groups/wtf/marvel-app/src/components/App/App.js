import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import md5 from 'blueimp-md5'

class App extends Component {
  render() {
    const result = md5('1549043538503d0b972b9b431bd6f772c7362015aac526ece63f18a010e4a3f405325dcf9504e99d7fe96')

    console.log(result)

    return (
      <div className="App">
        <header className="App-header">
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
