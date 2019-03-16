import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'

class Header extends Component {

    handleLogOut = () => {
        logic.logOutUser()
        sessionStorage.clear()
        return this.props.history.push('/landing')
    }

    render() {
        const { handleLogOut } = this

        return <header className="header">
        <img src="https://res.cloudinary.com/dnvdmcxqw/image/upload/v1552734358/logo.png" />
        <i class="fas fa-sign-out-alt fa-2x" onClick={handleLogOut}></i>
        </header>
    }
}

export default withRouter(Header)