import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'





class ConversationCard extends Component {

    state = {


        interlocutorId: null,
        interlocutorName: null


    }

    componentDidMount() {

        this.setState({ interlocutorId: this.props.interlocutorId })
            .then(() => {
                if (this.state.interlocutorId) {

                    return logic.retrieveUserPublicInfo(this.state.interlocutorId)
                    .then(username => this.setState({ interlocutorName = username }))

                }
            })
    }

    showChat = this.props.showChat(this.state.interlocutorId)


    render() {

        const { state: { interlocutorName, interlocutorId }, showChat } = this

        {
            return interlocutorName && <div onClick={showChat} className="ConversationCard">

                <img className="ConversationCard__img" src={images[0]}></img>
                <p className="ConversationCard__text" >{inter}</p>

            </div>
        }


    }

}


export default ConversationCard    