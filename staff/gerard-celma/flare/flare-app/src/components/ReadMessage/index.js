import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic';
import './index.sass'

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

        return <section className="readMessage">
            <div className="messageBox">
                <h2>Sent on: {message.date.slice(0,10)}</h2>
                <img src={message.image}/>
                <div>
                <p>{message.text}</p>
                </div>
                <button onClick={handleClick}>DONE</button>
                <p className="abuse">Report abuse by <a href="mailto:flarewelcome@gmail.com?Subject=Report%20abuse" target="_top">email</a></p>
            </div>
        </section>
    }
}

export default withRouter(ReadMessage)