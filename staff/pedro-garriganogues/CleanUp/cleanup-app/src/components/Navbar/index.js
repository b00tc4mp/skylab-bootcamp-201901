import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import SignedIn from './signedin'
import SignedOut from './signedout'
import logic from '../../logic'



class Navbar extends Component {



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



    render() {
        return (



            <main>
                <div className="navegacion">
                    <nav>
                        <ul>
                            <li><Link to="/" >HOME</Link> <span className="icon icon-up-dir"></span></li>
                            <li>  <Link to="/about" >About</Link><span className="icon icon-up-dir"></span></li>
                            <li>  <Link to="/contact" >Contact</Link><span className="icon icon-up-dir"></span></li>
                            <li>  <Link to="/products" >Products</Link><span className="icon icon-up-dir"></span></li>
                            <li>
                                <p>User</p>
                                <div className="submenu">
                                    <div className="submenu-items">
                                        {logic.__userApiToken__ && < SignedIn />}
                                    </div>
                                    <div className="submenu-items">
                                        {!logic.__userApiToken__ && <SignedOut />}
                                    </div>
                                    {/* <div className="submenu-items">
                                            <p>Submenu #3</p>
                                            <ul>
                                                <li><a href="#">Item #1</a></li>
                                                <li><a href="#">Item #2</a></li>
                                                <li><a href="#">Item #3</a></li>
                                            </ul>
                                        </div> */}
                                </div>
                            </li>

                            <span className="py-2 d-none d-md-inline-block">
                                {/* <Link to="/cart"><span role="img" aria-label="cart">🛒</span></Link> */}
                                <Link to="/cart"><span role="img" aria-label="cart"><i className="fas fa-shopping-cart">{this.props.cartLength ? <span className="badge badge-pill badge-info">{this.props.cartLength}</span> : ''}</i> </span></Link>
                            </span>
                        </ul>
                    </nav>
                </div>
            </main>



        )
    }

}

export default Navbar