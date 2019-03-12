'use strict'

import React, { Component } from 'react'
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

    render() {
        const { state:{ sentMessages, feedback } } = this

        return <section className="home">
            <p>Messages Sent</p>
            {sentMessages && sentMessages.map(({ date, text, userIdTo:{ image } }) => <div><img src={image} /><p>{date}</p><p>{text}</p></div>)}
        </section>
    }
}

export default MessagesSent