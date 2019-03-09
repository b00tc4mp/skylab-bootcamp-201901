import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic';

class ReadMessage extends Component {
    state = { message: null }

    componentWillMount() {
        this.setState({ message: this.props.location.state.matchedMessage })

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

        if(navigator.vibrate) {
            navigator.vibrate(1000)
        }
    }

    handleClick = () => {
        const { state: { message } } = this
        try{
            logic.messageRead(message._id)
            .then(() => {
                this.props.history.push('/home')
            })
            .catch(err => console.error(err))
        } catch(err) {
            console.error(err)
        }
    }
    


    render() {
        const { state: { message }, handleClick } = this

        console.log(message)

        return <section>
            <p>Read Message</p>
            <p>{message.text}</p>
            <p>{message.userIdFrom}</p>
            <p>{message.userIdTo}</p>
            <p>{message._id}</p>
            <button onClick={handleClick}>DONE</button>
        </section>
    }
}

export default withRouter(ReadMessage)