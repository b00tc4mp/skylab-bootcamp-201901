import React, { Component } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
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

        const { state: { chats } } = this

        return <section className="chatsViewer">
            <header className="header">
                <div className="chat__container">
                    <Link to="/">
                        <i className="fas fa-long-arrow-alt-left profile__icons--back  header__back"></i>
                    </Link>
                    <p className="chat__text">Conversations</p>
                </div>
            </header>
            <div className="chats">
                {chats && chats.map(({ id, messages, users }) => {
                    return <Chat key={id} id={id} messages={messages} users={users} userid={this.state.userid} onChatClick={this.props.onChatClick} />
                })}
            </div>
            {!chats.length && <div>
                <p className="chatsViewer__notfound">You don't have Conversations... :(</p>
            </div>}
        </section>
    }

}

export default withRouter(ChatViewer)