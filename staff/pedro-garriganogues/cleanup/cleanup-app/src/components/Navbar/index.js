import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import SignedIn from './SignedIn'
import SignedOut from './SignedOut'
import logic from '../../logic'



class Navbar extends Component {

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