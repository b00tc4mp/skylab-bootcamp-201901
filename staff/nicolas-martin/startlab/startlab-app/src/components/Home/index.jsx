import React, { Component } from 'react'

class Home extends Component {

  render() {
    const { props: { onStart } } = this

    return (
      <div className="home">
        <div className="home__student">
            <h2 className="title">Welcome to Startlab Test</h2>
            <h2 className="subtitle">Remember review the basics concepts of Javascript in codecademy (variables, strings, for loops, if-else...)</h2>

            <h2 className="subtitle">You have to complete 5 exercises to schelude an interview in Skylab.</h2>

            <button className="button is-info is-warning" onClick={onStart}>Start Test</button>
        </div>
      </div>
    )
  }
}

export default Home