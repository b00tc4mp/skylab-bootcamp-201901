'use strict'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Accordion from '../Accordion'
import Feedback from '../Feedback'
import logic from '../../logic';

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

        return <section className="home">
            <p>Messages Sent</p>
            {sentMessages && sentMessages.map(({ _id, date, text, userIdTo:{ image } }) => <div><img src={image} /><p>{date}</p><p>{text}</p><i class="far fa-trash-alt" onClick={() => handleClick(_id)}></i></div>)}
            {/* {sentMessages && <Accordion data={sentMessages} />} */}
            {feedback && <Feedback message={feedback} />}
        </section>
    }
}

export default withRouter(MessagesSent)