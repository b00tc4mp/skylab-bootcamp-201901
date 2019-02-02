import React from 'react'
import Login from '../Login'
import WelcomeBanner from '../WelcomeBanner'
import logic from '../../logic'

class Welcome extends React.Component {
    state= {welcomeBannerVisual: true, loginFeedback: null}

    handleGotoLogin(){
        this.props.history.push(`/login`)
        this.setState({welcomeBannerVisual: false})
    }

    handleGotoRegister(){
        // this.props.history.push(`/register`)
        this.setState({welcomeBannerVisual: false})
    }

    handleOnLogin(email,password){
        try {
            logic.login(email, password)
                .then(user => {
                    this.setState({ loginFeedback: null, user })
                })
                .catch(({ message }) => this.setState({ loginFeedback: message }))
                
        } catch ({ message }) {
            this.setState({ loginFeedback: message })
        }

    }

    
    render() {
        const {state: welcomeBannerVisual} = this

        return <section className="welcome">
            {welcomeBannerVisual && <WelcomeBanner onLoginClick={this.handleGotoLogin} onRegisterClick={this.handleGotoRegister}/>}
            <Route path="/login" render={() => <Login onLogin={this.handleOnLogin}/>} />
            {/* <Route path="/register" render={() => <Register/>} /> */}
        </section>
    }
}

export default Welcome