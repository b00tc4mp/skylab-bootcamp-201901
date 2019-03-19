import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'

class Chat extends Component {

    state = { username: null, imageUrl: null }

    componentDidMount() {
        this.retrieveUsersNames(this.props.users)
    }

    retrieveUsersNames = users => {
        users.filter(user => {
            if (user !== this.props.userid)
                return logic.retrieveUserWithId(user)
                    .then(_user => {
                        this.setState({ username: _user.name })
                        this.setState({ imageUrl: _user.imageUrl })
                    })
        })
    }

    handleOnChatCLick = id => {
        this.props.onChatClick(id)
    }


    render() {
        const { props: { id } } = this

        return <section>
            <header className="header">
                <div className="chat__container">
                    <Link to="/">
                        <i className="fas fa-long-arrow-alt-left profile__icons--back  header__back"></i>
                    </Link>
                    <p className="chat__text">Conversations</p>
                </div>
            </header>
            <div key={id} className="chat" onClick={() => this.handleOnChatCLick(id)}>
                <img className="chat__img" src={this.state.imageUrl ? this.state.imageUrl : "/images/logoplaceholder.png"}></img>
                <p className="chat__username">{this.state.username}</p>
            </div>
        </section>
    }
}

export default withRouter(Chat)