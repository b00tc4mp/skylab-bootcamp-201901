import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logic from '../../logic'


class Header extends Component {

    state = {user: null}

    componentDidMount(){
        logic.getUserApiToken() && logic.retrieveUser()
            .then(user => this.setState({user}))
    }

    componentWillReceiveProps(props){
        
        this.setState({user: props.user})
    }


    render() {

        const { props: {onLogout }, state: {user} } = this

        return <section className="hero is-small is-primary is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Ticket app title
                    </h1>
                    <h2 className="subtitle">
                        Mini ticket app title
                    </h2>
                </div>
                {!!user && <div className="navbar-end">
                    <Link className="navbar-item" to="/home/user" name="userInfo">
                        {user.name}
                    </Link>

                    <a className="navbar-item" onClick={onLogout} name="logOut">
                        Logout
                    </a>
                </div>
                }
            </div>
        </section >

    }
}

export default Header
