import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'





class ConversationCard extends Component {

    state = {


        interlocutorId: null,
        interlocutorName: null


    }

    async componentDidMount() {

        await this.setState({ interlocutorId: this.props.interlocutorId })
        if (this.state.interlocutorId) {

            const username = await logic.retrieveUserPublicInfo(this.state.interlocutorId)
            this.setState({ interlocutorName: username })

        }
    }



    render() {

        const { state: { interlocutorName, interlocutorId }, showChat, props: { contactButton } } = this

        {
            return interlocutorName && <div onClick={() => contactButton(interlocutorId)} className="conversationCard">

                <img className="conversationCard__img" src="http://monumentfamilydentistry.com/wp-content/uploads/2015/11/user-placeholder.png"></img>
                <p className="conversationCard__text" >{interlocutorName}</p>

            </div>
        }


    }

}


export default ConversationCard    