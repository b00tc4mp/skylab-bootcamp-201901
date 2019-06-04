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

        const { props: { handleLogout } } = this

        handleLogout()
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

        return <div>
            <button onClick={goToRegister}>Register</button>
            <button onClick={goToLogin}>Login</button>

        </div>

    }

    renderLoggedButtons(goToLogout, goToUserPanel, goToUploadGame) {
        return <div>
            <button onClick={goToUploadGame}>Upload Game</button>
            <button onClick={goToUserPanel}>User</button>
            <button onClick={goToLogout}>Logout</button>


        </div>
    }




    render() {
        const {
            goToRegister, goToLogin, goToLanding, goToLogout,
            goToUserPanel,goToUploadGame, renderUnloggedButtons, renderLoggedButtons, props: {onSearch, onSearchByGenre},
            state: { user }
        } = this
        return <div>
            <h1>Header</h1>
            <button onClick={goToLanding}>Go To Landing</button>
            {user ? renderLoggedButtons(goToLogout, goToUserPanel, goToUploadGame) : renderUnloggedButtons(goToRegister, goToLogin)}
            <SearchBar onSearch={onSearch}/>
            <GenresDropdown onSearchByGenre={onSearchByGenre} />
        </div>


    }

}

export default Header