import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Chat from '../Chat'
import './index.sass'

class ChatViewer extends Component {

    state = { chats: [], users: [], userid: null }

    componentDidMount() {
        this.retrieveAllChats()
    }

    retrieveAllChats = () => {
        // const userchats = []
        logic.retrieveUser()
            .then(user => {
                this.setState({ userid: user.id })
            })
            .then(() => {
                logic.retrieveChats()
                    .then(chats => {
                        this.setState({ chats })
                        return chats
                    })
            })
    }

    render() {

        const { state: {chats} } = this

        return <section className="chatsViewer">
            <div className="chats">
                {chats && chats.map(({ id, messages, users }) => {
                    return <Chat key={id} id={id} messages={messages} users={users} userid={this.state.userid} onChatClick={this.props.onChatClick}/>
                })}
            </div>
        </section>
    }

}

export default ChatViewer