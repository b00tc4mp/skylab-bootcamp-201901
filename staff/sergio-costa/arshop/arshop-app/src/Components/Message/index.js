import React, { Component } from 'react'
import logic from '../../logic'
import './index.sass'

class Message extends Component {

    state = { sendByMe: false }

    componentWillMount() {
        logic.retrieveUser()
            .then(user => {
                if (user.id == this.props.sender) this.setState({ sendByMe: true })
            })
    }

    render() {
        const { props: { text, sender } } = this
        return <section className={this.state.sendByMe ? "message--right" : "message--left"}>
            {/* {this.state.sendByMe && <p className="message__user">username</p>} */}
            <p className={this.state.sendByMe ? "message__text--right" : "message__text--left"}>{text}</p>
        </section>
    }
}

export default Message