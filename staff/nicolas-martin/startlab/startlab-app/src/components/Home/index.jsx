import React, { Component } from 'react'

class Home extends Component {

  render() {
    const { props: { onStart } } = this

    return (
      <div className="home">

        <h2 className="title">Lorem ipsum</h2>
        <h3 className="subtitle">Last year, millions of learners from our community started with JavaScript.
          Why? JavaScript is primarily known as the language of most modern web browsers,
          and its early quirks gave it a bit of a bad reputation. However, the language
          continued to evolve and improve. JavaScript is a powerful, flexible, and fast
          programming language now being used for increasingly complex web development and beyond!</h3>

        <hr />

        <button className="button is-info is-medium" onClick={onStart}>Empezar</button>

      </div>
    )
  }
}

export default Home