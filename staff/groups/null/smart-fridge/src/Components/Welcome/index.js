import React from 'react'
import Login from '../Login'
import Register from '../Register'
import WelcomeBanner from '../WelcomeBanner'
import logic from '../../logic'
import { withRouter, Route } from 'react-router-dom'
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
                .then (data => {
                    return logic.retrieve(data.id,data.token)
                    .then(user => {
                        console.log(user)
                        this.setState({ loginFeedback: null, user})
                        this.props.getUser(user)
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
                    console.log(id)
                })
                .catch(({ message }) => this.setState({ registerFeedback: message }))

        } catch ({ message }) {
            this.setState({ registerFeedback: message })
        }
    }

    
    render() {
        const {state: {welcomeBannerVisual}} = this

        return <section className="welcome">
                {/* welcomeBannerVisual && <WelcomeBanner onLoginClick={this.handleGotoLogin} onRegisterClick={this.handleGotoRegister}/> */}
                {welcomeBannerVisual && <Route exact path="/" render={() => <WelcomeBanner onLoginClick={this.handleGotoLogin} onRegisterClick={this.handleGotoRegister}/>}/>}
                {/* loginVisual && <Login onLogin={this.handleOnLogin} loginToRegister={this.handleGotoRegister}/> */}
                {/* registerVisual && <Register onRegister={this.handleOnLogin} registerToLogin={this.handleGotoLogin}/> */}
                {<Route path="/login" render={() => <Login onLogin={this.handleOnLogin} loginToRegister={this.handleGotoRegister}/>} />}
                {<Route path="/register" render={() => <Register onRegister={this.handleOnRegister} registerToLogin={this.handleGotoLogin}/>} />}
            </section>
 
    }
}

export default withRouter(Welcome)