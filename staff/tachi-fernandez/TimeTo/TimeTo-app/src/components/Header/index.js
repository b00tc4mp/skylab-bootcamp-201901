import React, { Component } from 'react'
import { Link ,Redirect, withRouter } from 'react-router-dom'
import './index.css'
import logic from '../../logic'


class Header extends Component {


    state = { loginFeedback: null, registerFeedback: null, showNav: false }

    onLogout = event => {
        event.preventDefault()
        logic.logOutUser()
        sessionStorage.clear()
        return this.props.history.push('/home')
    }
    
    componentDidMount() {
        this.props.history.listen(() => {
            this.setState({showNav: false})
        });
    }

    toggle = () => {
        this.setState({showNav: !this.state.showNav})
    }

    render() {
        const { onLogout } = this
        return (<nav className="nav" role="navigation">
                <div id="menuToggle">
                
                <input  type="checkbox" checked={this.state.showNav} onChange={this.toggle}/>
                
            
                <span></span>
                <span></span>
                <span></span>
                
                
                        <ul id="menu">

                      

                        {!logic.isUserLoggedIn ? <li > <Link to="/register" >
                        Register
                         </Link> </li>: ''}
                        

                        {!logic.isUserLoggedIn ? <li> <Link to="/login" >
                        Login
                         </Link> </li>: ''}


                        <li > <Link to="/home" >
                        Home
                         </Link> </li>

                        
                        {logic.isUserLoggedIn ? <li> <Link to="/create-event" >
                        Create Event
                         </Link> </li>: ''}

                       


                        {logic.isUserLoggedIn ? <li> <a href="/Logout" onClick={onLogout} >
                        Logout
                         </a> </li>: <Redirect to="/home" />}


                        {logic.isUserLoggedIn ? <li> <Link to="/user" >
                        User
                         </Link> </li>: ''}


                        {logic.isUserLoggedIn ? <li> <Link to="/my-events" >
                        My Events
                         </Link> </li>: ''}

                       
            
                        </ul>
                </div>

                <Link className="page" to="/home"> 
                <h2 className="page__time">Time</h2>
                <h2 className="page__to">T</h2> 
                <i className=" page__clock fas fa-clock"></i>
                </Link>

            </nav>   
            

        )
    }
}

export default withRouter(Header)