import React from 'react'

class WelcomeBanner extends React.Component {

    handleButtonLogin(){
        this.props.onLoginClick()
    }

    handleButtonLogin(){
        this.props.onRegisterClick()
    }

    render() {
        return <section className="welcome__banner">
            <h2 className="text-center pt-5 display-2">Recipes for your needs</h2>
            <p className="text-center mt-2 display-5">Smart fridge for smart people</p>
            <div className="row login-flex mt-3">
                <div className="col-md-3 col-0"></div>
                <button onClick={this.handleButtonLogin}  className="btn btn-dark col-12 col-sm-6 mr-2">Login</button>
                <button onClick={this.handleButtonRegister} className="btn btn-outline-secondary login__register-link ">Register</button>
            </div>
    </section>
    }
}

export default WelcomeBanner