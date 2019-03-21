import React, { Component } from 'react'
import './index.sass';
import ConversationCard from '../ConversationCard'
import Spinner from '../Spinner'


class Conversations extends Component {

    state = {


        conversations: null,
        loading:true



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
        if (conversations.length) {

            return conversations.map(conversation => {
                return <ConversationCard contactButton={this.props.contactButton} interlocutorId={conversation.interlocutor} > </ConversationCard>
            })
        }else{
            return <h2>You have no conversations</h2> 
        }
        


    }


    render() {

        const { state: { conversations,loading }, listConversations } = this


        return <div className="Conversations">

            { conversations ? listConversations(): <Spinner></Spinner>}

        </div>



    }

}


export default Conversations    