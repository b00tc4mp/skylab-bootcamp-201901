import React, { Component } from 'react'

class Home extends Component {

  render() {
    const { props: { onStart } } = this

    return (
      <div className="home">

        <h2>Lorem ipsum</h2>
        <p>Last year, millions of learners from our community started with JavaScript.
          Why? JavaScript is primarily known as the language of most modern web browsers,
          and its early quirks gave it a bit of a bad reputation. However, the language
          continued to evolve and improve. JavaScript is a powerful, flexible, and fast
          programming language now being used for increasingly complex web development and beyond!</p>

        <p>Since JavaScript remains at the core of web development, it's often the first language
        learned by self-taught coders eager to learn and build. We're excited for what you'll be
        able to create with the JavaScript foundation you gain here. JavaScript powers the dynamic
          behavior on most websites, including this one.</p>

        <p>In this lesson, you will learn introductory coding concepts including data types and built-in
        objects— essential knowledge for all aspiring developers. Make sure to take notes and pace yourself.
          This foundation will set you up for understanding the more complex concepts you'll encounter later.</p>

        <hr />

        <button onClick={onStart}>START</button>

      </div>
    )
  }
}

export default Home