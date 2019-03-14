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

        return <header className="hero is-small is-black">
            <div className="hero-body">
                <div className="block is-pulled-left">
                    <Link to="/home" className="title"><h1 className="title">HANGOUT<i className="fas fa-circle first"></i><i className="fas fa-circle second"></i><i className="fas fa-circle third"></i></h1></Link>
                </div>
     {!!user && <div className="block is-pulled-right header-icons">
                    <Link className="navbar-item" to="/home/user" name="userInfo">{user.name}</Link>
                    <a className="navbar-item" onClick={onLogout} name="logOut">Logout</a>
                </div>
                }
            </div>
        </header >
    }
}

export default Header
