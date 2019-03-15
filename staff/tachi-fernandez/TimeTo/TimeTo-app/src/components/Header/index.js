import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import './index.css'
import logic from '../../logic'


class Header extends Component {

    state = { loginFeedback: null, registerFeedback: null }

    onLogout = () => {
        logic.logOutUser()
        sessionStorage.clear()
        return this.props.history.push('/home')
    }
    
      

    render() {
        const { onLogout } = this
        return (<nav role="navigation">
                <div id="menuToggle">
                
                <input type="checkbox" />
                
            
                <span></span>
                <span></span>
                <span></span>
                
                
                        <ul id="menu">

                        <li>
                        {!logic.isUserLoggedIn ? <button
                            onClick={() =>
                            this.props.history.push('/register')}>Register
                        </button> : ''}
                        </li>
                        
                        {/* {!logic.isUserLoggedIn ? <a href="/register"><li>Register</li></a>: ''} */}


                        <li>
                        {!logic.isUserLoggedIn ? <button
                            onClick={() => this.props.history.push('/login')}>Login
                        </button> : ''}
                        </li>

                        {/* {!logic.isUserLoggedIn ? <a href="/login"><li>Login</li></a>: ''} */}

                        
                        <li>
                        {logic.isUserLoggedIn ? <button
                            onClick={() => this.props.history.push('/create-event')}>Create Event
                        </button> : ''}
                        </li>

                        {/* {logic.isUserLoggedIn ? <a href="/create-event"><li>Create Events</li></a>: ''} */}

                        {/* {!logic.isUserLoggedIn ? <a href="/create-event"><li>Register</li></a>: ''} */}

                        <li>
                        {logic.isUserLoggedIn ? <button
                            onClick={onLogout}>Logout
                        </button> : <Redirect to='/home' />}    
                        </li>

                        {/* {logic.isUserLoggedIn ? <a href="/user"><li>User</li></a>: ''} */}


                        <li>
                        {logic.isUserLoggedIn ? <button
                            onClick={() => this.props.history.push('/user')}>User
                        </button> : ''}
                        </li>

                        {/* {logic.isUserLoggedIn ? <a href="/my-events"><li>My Events</li></a>: ''} */}


                        <li>
                        {logic.isUserLoggedIn ? <button
                            onClick={() => this.props.history.push('/my-events')}> My Events
                        </button> : ''}
                        </li>
            
                        </ul>
                </div>
            </nav>            

        )
    }
}

export default withRouter(Header)