import React, { Component } from 'react'

import Feedback from '../Feedback/index'
import logic from '../../logic'

class Home extends Component {

  state = { answer: '', answerFeedback: null }

  handleFormSubmit = event => {
    event.preventDefault()
    let test = 'expect(favoriteFood).to.be.a("string")'
    const { state: { answer } } = this
    try {
      logic.checkCode(answer, test)
        .then(response => {
          this.setState({ answerFeedback: response.status })
        })
        .catch(error => {
          this.setState({ answerFeedback: error.message })
        })
    } catch (error) {
      this.setState({ answerFeedback: error.message })
    }
  }

  handleAnswerInput = event => this.setState({ answer: event.target.value })

  render() {
    const { state: { answerFeedback }, handleFormSubmit, handleAnswerInput } = this

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

        <h2>Console</h2>
        <p>The console is a panel that displays important messages, like errors, for developers. Much of the work 
          the computer does with our code is invisible to us by default. If we want to see things appear on our screen, 
          we can print, or log, to our console directly.</p>

          <p>In JavaScript, the console keyword refers to an object, a collection of data and actions, that we can use in 
          our code. Keywords are words that are built into the JavaScript language, so the computer will recognize them 
          and treats them specially.</p>

          <p>One action, or method, that is built into the console object is the .log() method. When we write console.log()
          what we put inside the parentheses will get printed, or logged, to the console.</p>

          <p>It's going to be very useful for us to print values to the console, so we can see the work that we're doing.</p>

        <hr />

        <h3>Your answer</h3>

        <form onSubmit={handleFormSubmit}>
          <textarea type="text" placeholder="start coding here..." onChange={handleAnswerInput} required />
          <button type="submit">Enviar</button>
        </form>

        {answerFeedback && <Feedback message={answerFeedback} />}

      </div>
    )
  }
}

export default Home