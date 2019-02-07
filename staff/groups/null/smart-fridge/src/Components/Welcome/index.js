import React from 'react'
import Login from '../Login'
import Register from '../Register'
import WelcomeBanner from '../WelcomeBanner'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'

class Welcome extends React.Component {
    state= {
        welcomeBannerVisual: true, 
        loginVisual: false,
        registerVisual: false,
        loginFeedback: null,
        resgisterFeedback: null,
        user: null}

    handleGotoLogin= ()=>{
        this.props.history.push(`/login`)
        this.setState({
            welcomeBannerVisual: false,
            /* loginVisual:true,
            registerVisual: false */
        })
    }

    handleGotoRegister=()=>{
        this.props.history.push(`/register`)
        this.setState({
            welcomeBannerVisual: false,
            /* loginVisual: false,
            registerVisual: true */
        })
    }

    handleOnLogin= (email,password)=>{
        try {
            logic.login(email, password)
                .then (() => {
                    return logic.retrieve(sessionStorage.getItem('user-id'),sessionStorage.getItem('user-api-token'))
                    .then(() => {
                        this.setState({ loginFeedback: null})
                    })
                })
                .catch(({ message }) => this.setState({ loginFeedback: message }))

        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }
    }

    handleOnRegister=(name, surname, email, password, confirmPassword, gender, height, weigth, birthDay, lifeStyle)=>{
        try {
            logic.register(name, surname, email, password, confirmPassword, gender, height, weigth, birthDay, lifeStyle)
                .then ((id) => {
                    this.props.history.push(`/login`)
                })
                .catch(({ message }) => this.setState({ registerFeedback: message }))

        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    
    render() {

        return <section className="welcome">
                {<Route exact path="/" render={() => <WelcomeBanner onLoginClick={this.handleGotoLogin} onRegisterClick={this.handleGotoRegister}/>}/>}
                {<Route path="/login" render={() =>  logic.userLoggedIn ? <Redirect to="/home" /> : <Login onLogin={this.handleOnLogin} loginToRegister={this.handleGotoRegister}/>} />}
                {<Route path="/register" render={() =>  logic.userLoggedIn ? <Redirect to="/home" /> : <Register onRegister={this.handleOnRegister} registerToLogin={this.handleGotoLogin}/>} />}
            </section>
 
    }
}

export default withRouter(Welcome)