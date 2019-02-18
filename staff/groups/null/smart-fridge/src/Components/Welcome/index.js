import React from 'react'
import Login from '../Login'
import Register from '../Register'
import WelcomeBanner from '../WelcomeBanner'
import logic from '../../logic'
import { withRouter, Route, Redirect } from 'react-router-dom'
import './index.sass'

class Welcome extends React.Component {
    state= {
        loginFeedback: null,
        registerFeedback: null,
        user: null}

    handleGotoLogin= ()=>{
        this.setState({ 
            loginFeedback: null,
            registerFeedback: null}, 
            ()=>this.props.history.push(`/login`))
        
    }

    handleGotoRegister=()=>{
        this.setState({ 
            loginFeedback: null,
            registerFeedback: null}, 
            ()=>this.props.history.push(`/register`))
        
    }

    handleOnLogin= (email,password)=>{
        try {
            logic.login(email, password)
                .then (() => {
                    return logic.retrieve(sessionStorage.getItem('user-id'),sessionStorage.getItem('user-api-token'))
                    .then(() => {
                        this.setState({ loginFeedback: null,registerFeedback: null})
                    })
                })
                .catch( error => this.setState({ loginFeedback: error.message }))

        } catch (error) {
            this.setState({ loginFeedback: error.message })
        }
    }

    handleOnRegister=(name, surname, email, password, confirmPassword, gender, height, weigth, birthDay, lifeStyle)=>{
        try {
            logic.register(name, surname, email, password, confirmPassword, gender, height, weigth, birthDay, lifeStyle)
                .then (() => {
                    this.props.history.push(`/login`)
                })
                .catch(error => this.setState({ registerFeedback: error.message }))

        } catch (error) {
            this.setState({ registerFeedback: error.message })
        }
    }

    
    render() {

        const {state:{loginFeedback, registerFeedback}}=this

        return <section className="welcome">
                {<Route exact path="/" render={() => <WelcomeBanner onLoginClick={this.handleGotoLogin} onRegisterClick={this.handleGotoRegister}/>}/>}
                {<Route path="/login" render={() =>  logic.userLoggedIn ? <Redirect to="/home" /> : <Login onLogin={this.handleOnLogin} loginToRegister={this.handleGotoRegister} feedback={loginFeedback}/>} />}
                {<Route path="/register" render={() =>  logic.userLoggedIn ? <Redirect to="/home" /> : <Register onRegister={this.handleOnRegister} registerToLogin={this.handleGotoLogin} feedback={registerFeedback}/>} />}
            </section>
 
    }
}

export default withRouter(Welcome)