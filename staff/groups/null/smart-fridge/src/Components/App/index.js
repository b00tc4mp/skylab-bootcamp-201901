import React, { Component } from 'react';
import './index.css';
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return <BrowserRouter>
            <main className="app">
                {/* <Welcome /> */}
                {/* <Home /> */}
            </main>
        </BrowserRouter>
  }
}

export default App;
