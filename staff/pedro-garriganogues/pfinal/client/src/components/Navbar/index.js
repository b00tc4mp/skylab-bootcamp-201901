import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import SignedIn from './signedin'
import SignedOut from './signedout'
import logic from '../../logic'
import Products from '../Products'


class Navbar extends Component {
    state = {
        user: {},
        categories: []

    }

    // retrieveUser() {
    //     if (this.props.loggedIn)
    //         logic.retrieveUser()
    //             .then(user => {
    //                 this.setState({ user })
    //             })
    // }

    // componentDidMount() {
    //     if (this.props.loggedIn) {
    //         this.retrieveUser()
    //     }


    // }

    // componentWillReceiveProps(props) {
    //     if (props.loggedIn) {
    //         this.retrieveUser()
    //     }
    // }

    // logout() {
    //     logic.logout()

    //     this.props.onLogout()
    // }

    render() {
        return (
            <nav className="navbar">
                <div className="container">

                    <Link to="/" >HOME</Link>
                    <Link to="/about" >About</Link>
                    <Link to="/contact" >Contact</Link>
                    <Link to="/products" >Products</Link>
                    <Link to="/" >Carro</Link>

                    {< SignedIn />}
                    {<SignedOut />}
                </div>
            </nav>

        )
    }

}

export default Navbar