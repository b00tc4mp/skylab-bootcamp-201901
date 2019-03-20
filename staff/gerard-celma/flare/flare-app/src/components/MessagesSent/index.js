'use strict'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Feedback from '../Feedback'
import logic from '../../logic'
import './index.sass'

class MessagesSent extends Component {
    state = { sentMessages: null, feedback: null }

    componentWillMount() {
        try {
            logic.retrieveSentMessages()
                .then(messages => {
                    this.setState({ sentMessages : messages.msgSent })
                    console.log(this.state.sentMessages)
                })
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({message}) {
            this.setState({ feedback: message })
        }
    }

    handleClick = (msgId) => {
        try {
            logic.messageDelete(msgId)
                .then(() => this.props.history.push('/success'))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        const { state:{ sentMessages, feedback }, handleClick } = this

        return <section className="messagesSent">
            <p>Messages Sent</p>
            <div className="noMessageContainer">
                {((!sentMessages) || (sentMessages.length === 0)) && <div className="noMessagesContainer">no messages sent</div>}
            </div>
            <div className="messagesContainer">
                {sentMessages && sentMessages.map(({ _id, date, text, image, userIdTo:{ name, surname } }) => <div><p>To: {name} {surname}</p><p>Sent: {date.slice(0,10)}</p><img className="profileImage" src={image} /><p className="textMes">{text}</p><p className="trashMes"><i class="far fa-trash-alt" onClick={() => handleClick(_id)}></i></p></div>)}
            </div>
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default withRouter(MessagesSent)