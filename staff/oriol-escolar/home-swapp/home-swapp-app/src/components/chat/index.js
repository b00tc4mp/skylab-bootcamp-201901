import React, { Component } from 'react'
import './index.sass';

import logic from '../../logic'


class Chat extends Component {


    state = {

        interlocutorId: null,
        interlocutorName: null,
        messages: null

    }

    componentDidMount() {

        this.setState({ interlocutorId: this.props.interlocutorId, messages: this.props.messages })



    }

    componentDidUpdate(prepProvs) {
        if (prepProvs.interlocutorId !== this.state.interlocutorId) {
            const { interlocutorId } = this.props
            this.setState({ interlocutorId })
        }
        if (prepProvs.messages !== this.state.messages) {
            const { messages } = this.props
            this.setState({ messages })
        }



    }

    onSendMessage = () => {



    }


    goBack() {

        window.history.back()
    }

    render() {

        const { state: { interlocutorName }, props: { }, goBack } = this

        return <div className="chat" >

            <div className='chat-header'>
                <img className ="chat-header__image" src="http://monumentfamilydentistry.com/wp-content/uploads/2015/11/user-placeholder.png" ></img>
                <p className = "chat-header__username">Username</p>
            </div>

            <div className='chat-messages'>
                <p className= "chat-messages-message__recieved">hey</p>
                <p className="chat-messages-message__sent">hi</p>
                <p className="chat-messages-message__sent">hi</p>
                <p className="chat-messages-message__recieved" > how are you</p>
                <p className= "chat-messages-message__recieved">hey</p>
                <p className="chat-messages-message__sent">hi</p>
                <p className="chat-messages-message__sent">hi</p>
                <p className="chat-messages-message__recieved" > how are you</p>

            </div>

            <div className='chat-form'>

                <form className='chat-form-form' >

                    <input className="chat-form-form__input" type="text" name="text" placeholder="Type a message" />
                    <button className="chat-form-form__button">Send </button>

                </form>


            </div>

        </div>
    }


}

export default Chat