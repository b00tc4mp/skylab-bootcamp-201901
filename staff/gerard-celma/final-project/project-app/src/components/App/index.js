import React, { Component } from 'react';
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer'
import './index.sass';

class App extends Component {
  render() {
    return <section>
      <Header />
      <Landing />
      <Footer />
    </section>
  }
}

export default App
