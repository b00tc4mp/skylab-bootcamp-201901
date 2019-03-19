import React, { Component } from 'react'

class Home extends Component {

  render() {
    const { props: { onStart } } = this

    return (
      <div className="home">

        <h2 className="title">Welcome to your test</h2>
        <h3 className="subtitle">you have to complete 5 exercises to schelude an interview in Skylab</h3>

        <hr />

        <button className="button is-info is-medium" onClick={onStart}>Start Test</button>

      </div>
    )
  }
}

export default Home