import React, { Component } from 'react'
import './index.sass';
import ConversationCard from '../ConversationCard'
import logic from '../../logic'

class Conversations extends Component {

    state = {


        conversations: null,



    }

    componentDidMount() {

        this.setState({ conversations: this.props.conversations })

    }

    componentWillReceiveProps = (props) => {

        if (props.conversations !== this.state.conversations)
            this.setState({ conversations: this.props.conversations })


    }

   


    listConversations = () => {

        const { state: { conversations } } = this

        return conversations.map(conversation => {
            return <ConversationCard contactButton={this.props.contactButton} interlocutorId={conversation.interlocutor} > </ConversationCard>
        })



    }


    render() {

        const { state: { conversations }, listConversations } = this


        return  <div className="Conversations">

                {conversations ? listConversations() : <p> sjkgdsahdjkb</p> }
                
            </div>



    }

}


export default Conversations    