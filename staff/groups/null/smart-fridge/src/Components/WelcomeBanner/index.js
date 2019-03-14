import React from 'react'

class WelcomeBanner extends React.Component {

    handleButtonLogin= () => {
        const { props: { onLoginClick } } = this
        onLoginClick()
    }

    handleButtonRegister= () => {
        const { props: { onRegisterClick } } = this
        onRegisterClick()
    }

    render() {
        return <section className="welcome__banner">
            <h2 className="text-center display-2">Recipes for your needs</h2>
            <p className="text-center mt-2 display-5">Smart fridge for smart people</p>
            <div className="row login-flex mt-3">
                <div className="col-sm-3 col-0"></div>
                <button onClick={this.handleButtonLogin} className="btn btn-dark col-12 col-sm-3 mr-2">Login</button>
                <button onClick={this.handleButtonRegister} className="btn btn-outline-light col-12 col-sm-3 mt-2 mt-sm-0 ">Register</button>
                <div className="col-sm-3 col-0"></div>
            </div>
        </section>
    }
}

export default WelcomeBanner