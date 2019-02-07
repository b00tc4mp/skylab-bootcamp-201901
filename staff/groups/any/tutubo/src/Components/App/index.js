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
import Home from '../Home'
import Comments from '../Comments';
import Favorites from '../Favorites';

//#endregion

class App extends Component {

    //#region STATES

    state = { email: '', videoId: '', text: '', loginFeedback:'', registerFeedback:'', mode: false, likes:null }

    //#endregion

    componentDidMount() {
        this.updateDocumentColor()
    }

    updateDocumentColor() {
        document.getElementsByTagName('html')[0].style.backgroundColor = this.state.mode? 'white' : '#121212'
    }

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
            logic.loginUser(email, password)
                .then(() => {
                    this.props.history.push('/')
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

    handleLikeVideo = (videoId) => {
        try {
            logic.likeVideo(videoId)
            .then(likes => this.setState({likes}, () => console.log(this.state.likes)))
                .catch(/* set state of feedback message */)
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleOnLogout = () => {

        logic.logout()

        this.props.history.push('/')
    }

    handleModeSwitch = () => {
        this.setState({ mode: !this.state.mode}, () => this.updateDocumentColor())
    }

    handleOnGoToFavs = () => {
        this.props.history.push('/favorites')
    }

    //#endregion

    //#region RENDER

    render() {
        const { pathname } = this.props.location;
        console.log(pathname)
        const { handleOnLogout, handleSelectVideo, handleGoToRegister, handleGoToLogin, handleSearch, handleLogin, handleRegister, handleLoginButton, handleComment, handleModeSwitch, handleLikeVideo, handleOnGoToFavs, state:{ videoId, loginFeedback, registerFeedback, email } } = this
        return <section>
            {!this.isLoginOrRegister() && <Header onSearch={handleSearch} onGoToLogin={handleLoginButton} onLogout={handleOnLogout} onModeSwitch={handleModeSwitch} mode={this.state.mode} onGoToFav={handleOnGoToFavs}/>}
            <Route exact path="/search/:query" render={props => <VideoResults selectVideo={handleSelectVideo} query={props.match.params.query} mode={this.state.mode}/>} />
            <Route exact path="/" render={() => <Home selectVideo={handleSelectVideo} mode={this.state.mode}/>} /> 
            <Route exact path="/watch/:id" render={props => <Video videoId={props.match.params.id} onLike={handleLikeVideo} like={this.state.likes} mode={this.state.mode}/>} />
            <Route exact path="/login/" render={() => logic.userLoggedIn ? <Redirect to='/' /> : <Login onLogin={handleLogin} onGoToRegister={handleGoToRegister} feedback={loginFeedback} mode={this.state.mode}/>} />
            <Route exact path="/register/" render={() => logic.userLoggedIn ? <Redirect to='/'/> : <Register onRegister={handleRegister} onGoToLogin={handleGoToLogin} feedback={registerFeedback} mode={this.state.mode}/>} />
            <Route exact path="/favorites" render={() => !logic.userLoggedIn ? <Redirect to='/'/>: <Favorites mode={this.state.mode} selectVideo={handleSelectVideo}/>}/>
        </section>
    }

    //#endregion
}

export default withRouter(App)