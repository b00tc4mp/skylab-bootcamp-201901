import React, { Component } from 'react'
import './index.scss'
import SearchBar from '../SearchBar'
import GenresDropdown from '../GenresDropdown';

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

        const { props: { handleLogout, handleGoToLanding } } = this
        

        handleLogout()
        handleGoToLanding()
        
    }

    goToUserPanel = event => {
        event.preventDefault()

        const { props: { handleGoToUserPanel } } = this

        handleGoToUserPanel()
    }

    goToUploadGame = event => {
        event.preventDefault()
        const { props: { handleGoToUploadGame } } = this

        handleGoToUploadGame()
    }

    renderUnloggedButtons(goToRegister, goToLogin) {

        return <div className="Header__unloggedButton-margin">
            <button className="Header__button" onClick={goToRegister}>Register</button>
            <button className="Header__button" onClick={goToLogin}>Login</button>

        </div>

    }

    renderLoggedButtons = (goToLogout, goToUserPanel, goToUploadGame) => {
        const { user: { username } } = this.state
        return <div className="Header__loggedButtons">
            <i className="Header__uploadIcon fas fa-upload" onClick={goToUploadGame}/>
            <div className="Header__loggedButton-margin">
                <a className="Header__userButton" onClick={goToUserPanel}>{username}</a>
                <i className="Header__icons fas fa-sign-out-alt"onClick={goToLogout}></i>
            </div>
        </div>
    }




    render() {
        const {
            goToRegister, goToLogin, goToLanding, goToLogout,
            goToUserPanel, goToUploadGame, renderUnloggedButtons, renderLoggedButtons, props: { onSearch, onSearchByGenre },
            state: { user }
        } = this
        return <div className="Header">
            <a className="Header__title" onClick={goToLanding}><h1 className="Header__titleReset">Freendies</h1></a>
            <GenresDropdown onSearchByGenre={onSearchByGenre} />
            <SearchBar onSearch={onSearch} />
            {user ? renderLoggedButtons(goToLogout, goToUserPanel, goToUploadGame) : renderUnloggedButtons(goToRegister, goToLogin)}

        </div>
    }

}

export default Header