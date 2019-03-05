import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import SignedIn from './signedin'
import SignedOut from './signedout'


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
                    <Link to="/" >Carro</Link>

                    {< SignedIn />}
                    {<SignedOut />}
                </div>
            </nav>




            //     <main className="navbar-container">
            //         <nav>
            //             <div>
            //                 <div>
            //                     <Link to="/">GO HOME<p /></Link>
            //                 </div>

            //                 <span className="py-2 d-none d-md-inline-block">
            //                     <Link to="/about">About</Link>
            //                     <Link to={`/contact/`} className="dropdown-item" href="" >Contact</Link>
            //                 </span>
            //                 {(!this.props.loggedIn) ?
            //                     <div>
            //                         <span>
            //                             <Link to="/login">Login</Link>
            //                         </span>
            //                         <span>
            //                             <Link to="/register">Register</Link>
            //                         </span>
            //                     </div>
            //                     :
            //                     <div className="dropdown">
            //                         <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.user.name}</button>
            //                         <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            //                             <Link to="/profile" className="dropdown-item">Profile</Link>
            //                             <p>My cart</p>
            //                             <Link to="/" className="dropdown-item" style={{ cursor: 'pointer' }} onClick={() => { this.logout() }}>logout</Link>
            //                         </div>
            //                     </div>
            //                 }
            //                 <span >
            //                     <Link to="/cart"><span role="img" aria-label="cart"><i>{this.props.cartLength ? <span className="badge badge-pill badge-info">{this.props.cartLength}</span> : ''}</i> </span></Link>
            //                 </span>
            //             </div>
            //         </nav>
            //     </main>
        )
    }

}

export default Navbar