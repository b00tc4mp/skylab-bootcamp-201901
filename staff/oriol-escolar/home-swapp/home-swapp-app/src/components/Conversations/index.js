import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'

class Conversations extends Component {

    state = {


        conversations: null,



    }

    componentDidMount() {

        this.setState({ conversations: this.props.conversations })
           
    }

    componentWillReceiveProps = (props)=>{
        
        if(props.conversations !== this.state.conversations)
        this.setState({ conversations: this.props.conversations })

        
    }


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


export default Conversations    