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
    const { state: { answerFeedback }, handleFormSubmit, handleAnswerInput, props: { onStart } } = this

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