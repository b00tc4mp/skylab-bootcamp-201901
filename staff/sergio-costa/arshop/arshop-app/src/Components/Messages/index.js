import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import Message from '../Message'
import './index.sass'

class Messages extends Component {

    state = { username: null, imageUrl: null, messages: [], userid: null, message: null }


    componentDidMount() {
        this.retrieveMessages(this.props.chatId)
    }

    retrieveMessages = chatId => {
        logic.retrieveMessagesFromChat(chatId)
            .then(messages => this.setState({ messages }))
    }

    handleInput = event => {
        this.setState({ message: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { props: { chatId }, state: { message } } = this

        logic.sendMessage(chatId, message)
            .then(() => this.retrieveMessages(chatId))
            .then(() => this.cleanInput())
    }

    cleanInput = () => {
        this.setState({message: ''}, console.log(this.state.message))
    }

    render() {
        const { state: { messages } } = this
        return <section>
            <header className="header">
                <div className="messages__container">
                    <Link to="/chat">
                        <i className="fas fa-long-arrow-alt-left profile__icons--back  header__back"></i>
                    </Link>
                    {/* <p className="messages__text">username</p> */}
                </div>
            </header>
            <div className="messages">
                {messages && messages.map(({ text, sender }) => {
                    return <Message text={text} sender={sender} />
                })}
            </div>
            <form className="messages__form" onSubmit={this.handleSubmit}>
                <input className="messages__input" type="text" value={this.state.message} placeholder="type message" onChange={this.handleInput} />
                <button className="messages__btn">Send</button>
            </form>
        </section>
    }

}

export default Messages