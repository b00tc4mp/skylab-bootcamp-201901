'use strict'

//#region IMPORTS

import React, { Component } from 'react'
import Register from '../Register'
import logic from '../../logic';
import './index.sass'
import Header from '../Header';
import Login from '../Login'
import VideoResults from '../VideoResults'
import { withRouter, Route, Redirect } from 'react-router-dom'
import Video from '../Video'

//#endregion

class App extends Component {

    //#region STATES

    state = { email: '', videoId: '', text: '', loginFeedback:'', registerFeedback:'' }

    //#endregion

    //#region HANDLES

    handleRegister = (name, surname, email, password, passswordConfirmation) => {
        try {
            logic.registerUser(name, surname, email, password, passswordConfirmation)
                .then(() => this.props.history.push('/login/'))
                .catch(({message}) => {
                    this.setState({registerFeedback: message})
                })
        } catch({message}){
            this.setState({registerFeedback: message})
        }
    }

    handleLogin = (email, password) => {
        try {
            debugger
            logic.loginUser(email, password)
                .then(() => {
                    this.props.history.push('/')
                    return logic.authenticateUser(email, password)
                        .then((data) => {
                            console.log(data)
                            // sessionStorage.setItem('myUser', JSON.stringify(data))
                        })
                })
                .catch(({message}) => {
                    this.setState({loginFeedback:message})
                })
        } catch({message}) {
            this.setState({loginFeedback:message})
        }
    }

    handleGoToRegister = () => {
        this.setState({loginFeedback:''})
        this.props.history.push('/register/')
    }

    handleGoToLogin= () => {
        this.setState({registerFeedback: ''})
        this.props.history.push('/login')
    }

    handleSearch = query => {
        this.props.history.push(`/search/${query}`)
    }

    handleLoginButton = () => {
        this.props.history.push('/login/')
    }

    isLoginOrRegister = () => {
        const pathname = this.props.location.pathname
        return (
            pathname.includes('login') || pathname.includes('register')
        )
    }

    handleSelectVideo = id => {

        this.setState({videoId: id}, () => 
            this.props.history.push(`/watch/${id}`)
        )
    }


    //#endregion

    //#region RENDER

    render() {
        const { pathname } = this.props.location;
        console.log(pathname)
        const { handleSelectVideo, handleGoToRegister, handleGoToLogin, handleSearch, handleLogin, handleRegister, handleLoginButton, handleComment, state:{videoId, loginFeedback, registerFeedback} } = this
        return <section>
            {!this.isLoginOrRegister() && <Header onSearch={handleSearch} onGoToLogin={handleLoginButton} />}
            <Route path="/search/:query" render={props => <VideoResults selectVideo={handleSelectVideo} query={props.match.params.query} />} />
            <Route exact path="/watch/:id" render={props => <Video videoId={props.match.params.id} />} />
            <Route path="/login/" render={() => logic.userLoggedIn ? <Redirect to='/' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} feedback={loginFeedback}/>} />
            <Route path="/register/" render={() => logic.userLoggedIn ? <Redirect to='/' /> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} feedback={registerFeedback} />} />
        </section>
    }

    //#endregion
}

export default withRouter(App)