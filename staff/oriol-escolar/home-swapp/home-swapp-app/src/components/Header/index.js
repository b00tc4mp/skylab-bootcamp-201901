import React, { Component } from 'react'
import './index.sass';




class Header extends Component {

    state = {

        user: ""


    }

    componentDidMount(){


        this.setState({ user: this.props.user })
        

    }

    componentDidUpdate(prevProps) {

        if(this.state.user !== prevProps.user)
        this.setState({ user: prevProps.user })

    }

    goToRegister = event => {
        event.preventDefault()

        const { props: { handleGoToRegister } } = this

        handleGoToRegister()


    }

    goToLogin = event => {
        event.preventDefault()
        const { props: { handleGoToLogin } } = this
        handleGoToLogin()

    }

    goToLanding = event => {
        event.preventDefault()

        const { props: { handleGoToLanding } } = this

        handleGoToLanding()



    }

    goToLogout = event => {
        event.preventDefault()

        this.setState({ user: "" })

        const { props: { handleGoToLogout } } = this

        handleGoToLogout()

    }
    goToUser = event => {
        event.preventDefault()

        const { props: { handleGoToUser } } = this

        handleGoToUser()


    }
    goToConversations = event => {
        event.preventDefault()

        const { props: { handleGoToConversations } } = this

        handleGoToConversations()

    }


    renderUnloggedButtons(goToLogin, goToRegister) {

        return <div className="header-unLoggedButtons">

            <button className="header-unLoggedButtons__login" onClick={goToLogin}>Login</button>
            <button className="header-unLoggedButtons__register" onClick={goToRegister}>Register</button>
        </div>

    }

    renderloggedButtons(goToLogout, goToConversations, goToUser) {

        return <div className="header-loggedButtons">
            <i className="fas fa-envelope header-loggedButtons__messages" onClick={goToConversations}></i>
            <i className="fas fa-sign-out-alt header-loggedButtons__logout" onClick={goToLogout}></i>
            <img className="header-loggedButtons__userProfile" src="http://monumentfamilydentistry.com/wp-content/uploads/2015/11/user-placeholder.png" onClick={goToUser}></img>
        </div>

    }


    render() {

        const { goToLogin, goToRegister, goToLanding, goToLogout, goToConversations, goToUser, renderUnloggedButtons, renderloggedButtons, state: { user } } = this

        return <div className="header">


            <img className="header__logo" src="https://cdn4.iconfinder.com/data/icons/real-estate-69/64/home-swap-exchange-real-estate-renovate-512.png" onClick={goToLanding}></img>

            {user ? renderloggedButtons(goToLogout, goToConversations, goToUser) : renderUnloggedButtons(goToLogin, goToRegister)}


        </div>






    }



}


export default Header