import React, { Component } from 'react'
import './index.sass';

import logic from '../../logic'


class Chat extends Component {


    state = {

        interlocutorId: null,
        interlocutorName: null,
        messages: null,
        text: ""

    }

    async componentDidMount() {

        await this.setState({ interlocutorId: this.props.interlocutorId, messages: this.props.messages })

        if (this.state.interlocutorId) {

            const interlocutorName = await logic.retrieveUserPublicInfo(this.state.interlocutorId)
            this.setState({ interlocutorName })
        }

        window.scrollTo(0, 7000)


    }

    componentDidUpdate(){

        window.scrollTo(0, 7000)
        
    }

    componentWillReceiveProps(props) {

        if (props.interlocutorId !== this.state.interlocutorId) {
            const { interlocutorId } = this.props
            this.setState({ interlocutorId })
                .then(() => {

                    return logic.retrieveUserPublicInfo(this.state.interlocutorId)
                        .then((interlocutorName) => this.setState({ interlocutorName }))

                })
        }
        if (props.messages !== this.state.messages) {
            this.setState({ messages: props.messages })
            
        }
        
    }



    onSendMessage = (event) => {

        event.preventDefault()

        const { state: { interlocutorId, text } } = this

        logic.sendMessage(interlocutorId, text)
        this.props.sendMessage(text).then(() => window.scrollTo(0, 7000))
        this.setState({ text: "" })




    }


    goBack() {

        window.history.back()
    }

    listMessages = () => {

        const { state: { messages } } = this

        return messages.map(message => {

            if (message.sent) {
                return <p className="chat-messages-message__sent">{message.text}</p>

            } else {
                return <p className="chat-messages-message__recieved">{message.text}</p>

            }


        })



    }


    handleInput = event => this.setState({ [event.target.name]: event.target.value })


    render() {

        const { state: { interlocutorName, text }, props: { }, goBack, onSendMessage, handleInput, listMessages } = this

        return <div>

            {interlocutorName &&


                <div className="chat" >
                    <div className='chat-header'>
                        <img className="chat-header__image" src="http://monumentfamilydentistry.com/wp-content/uploads/2015/11/user-placeholder.png" ></img>
                        <p className="chat-header__username">{interlocutorName}</p>
                    </div>

                    <div className='chat-messages'>

                        {listMessages()}

                    </div>

                    <div className='chat-form'>

                        <form className='chat-form-form' onSubmit={onSendMessage} >

                            <input className="chat-form-form__input" type="text" name="text" placeholder="Type a message" value={text ? text : ""} onChange={handleInput} />
                            <button className="chat-form-form__button">Send </button>

                        </form>


                    </div>

                </div>


            }

        </div>
    }

}

export default Chat