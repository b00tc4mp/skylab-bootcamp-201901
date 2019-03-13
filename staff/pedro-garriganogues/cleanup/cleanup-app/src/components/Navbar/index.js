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
        // caso individual:

        // const hideProducts = props.location.pathname.includes(['register'])

        // caso multiple:

        // const hideProducts = ['/register', '/login', '/profile', '/contact', '/about', '/products', '/cart', '/product'].includes(props.location.pathname)


        return (



            <section>
                <div className="navegacion">
                    <nav>
                        <ul>
                            <li><Link to="/" ><img src="https://i.gyazo.com/7dd6933988eb4cbbe3915c6ce92de52f.png" className="bigLogo" alt="404" /></Link></li>
                            <li>  <Link to="/about" >About</Link></li>
                            <li>  <Link to="/contact" >Contact</Link></li>
                            <li>  <Link to="/products" >Products</Link></li>
                            <li>
                                <p className="userLetters">User</p>
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
                            <li><Link to="/cart" ><img src="https://i.gyazo.com/7a5ababebdcc9837031e78b33e91b156.png" className="cartLogo" alt="404" /></Link></li>

                            <span className="py-2 d-none d-md-inline-block">

                            </span>
                        </ul>
                    </nav>
                </div>
            </section>



        )
    }

}

export default Navbar