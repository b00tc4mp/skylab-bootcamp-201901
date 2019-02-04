import React from 'react'
import Login from '../Login'
import Register from '../Register'
import WelcomeBanner from '../WelcomeBanner'
// import logic from '../../logic'
import { withRouter, Route } from 'react-router-dom'
import './index.sass'

class Welcome extends React.Component {
    state= {
        welcomeBannerVisual: true, 
        loginVisual: false,
        registerVisual: false,
        loginFeedback: null}

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

    handleOnLogin(email,password){
        try {
            console.log(email,password)
            // logic.login(email, password)
            //     .then(user => {
            //         this.setState({ loginFeedback: null, user })
            //     })
            //     .catch(({ message }) => this.setState({ loginFeedback: message }))

        } catch ({ message }) {
            this.setState({ loginFeedback: message })
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
                {<Route path="/register" render={() => <Register onRegister={this.handleOnLogin} registerToLogin={this.handleGotoLogin}/>} />}
            </section>
 
    }
}

export default withRouter(Welcome)