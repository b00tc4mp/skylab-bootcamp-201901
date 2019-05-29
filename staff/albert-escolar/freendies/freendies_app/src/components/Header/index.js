import React, { Component } from 'react'
import './index.scss'

class Header extends Component {
    state = {

        user: ""
    }

    componentDidMount() {
        this.setState({ user: this.props.user })
    }

    componentWillReceiveProps(props) {
        const { user } = props
        this.setState({ user })
    }

    componentDidUpdate(prevProps) {
        if (this.state.user !== prevProps.user)
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

        const { props: { handleLogout } } = this

        handleLogout()
    }

    goToUser = event => {
        event.preventDefault()

        const { props: { handleGoToUser } } = this

        handleGoToUser()
    }

    goToUploadGame = event => {
        event.preventDefault()
        const { props: { handleGoToUploadGame } } = this

        handleGoToUploadGame()
    }

    renderUnloggedButtons(goToRegister, goToLogin) {

        return <div>
            <button onClick={goToRegister}>Register</button>
            <button onClick={goToLogin}>Login</button>

        </div>

    }

    renderLoggedButtons(goToLogout, goToUser, goToUploadGame) {
        return <div>
            <button onClick={goToUser}>User</button>
            <button onClick={goToUploadGame}>Upload Game</button>
            <button onClick={goToLogout}>Logout</button>


        </div>
    }


    render() {
        const {
            goToRegister, goToLogin, goToLanding, goToLogout,
            goToUser,goToUploadGame, renderUnloggedButtons, renderLoggedButtons,
            state: { user }
        } = this
        return <div>
            <h1>Header</h1>
            <button onClick={goToLanding}>Go To Landing</button>
            {user ? renderLoggedButtons(goToLogout, goToUser, goToUploadGame) : renderUnloggedButtons(goToRegister, goToLogin)}
        </div>


    }

}

export default Header