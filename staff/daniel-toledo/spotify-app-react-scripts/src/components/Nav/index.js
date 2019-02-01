import React from 'react'
import Search from '../Search'
import logo from "./logo.png"

class Nav extends React.Component {
    handleLogout = event => {
        event.preventDefault()

        this.props.onLogout()
    }

    handleSearch = query => this.props.onSearch(query)

    render() {
        return <nav className="navbar navbar-light bg-light searchPanel">
            <img src={logo} width="200px" />
            {this.props.searchNavVisual && <Search onSearch={this.handleSearch} />}
            {this.props.logoutButtonVisual && <button onClick={this.handleLogout} className="btn btn-outline-dark" id="logout">Logout</button>}
        </nav>
    }
}

export default Nav