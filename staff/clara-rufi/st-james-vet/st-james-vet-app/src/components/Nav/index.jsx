import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'
import logo from '../images/logo.png'

import './index.sass'

class Nav extends Component {
   
     state = { isLoggedIn: logic.isUserLoggedIn,  isAdmin:logic.isAdmin}

    handleOnLogin = event => {
        event.preventDefault()
        this.props.history.push('/login')
    }
  
    handleRegisterOwner = event => {
        event.preventDefault()
        this.props.history.push('/registerOwner')
    }

    handleEditPet = event => {
        event.preventDefault()
        this.props.history.push('/editPet')
    }
    
    handleEditOwner = event => {
        event.preventDefault()
        this.props.history.push('/editOwner')
    }

    handleOnLogout = event => {
        event.preventDefault()
        logic.logOutUser()  
    }

    handleRegisterPet = event => {
        event.preventDefault()
        this.props.history.push('/registerPet')
    }
    render() {
        const {state: {isAdmin, isLoggedIn}}= this
        let dropdownButton
        if (isLoggedIn) {

            dropdownButton = <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-paw"></i>
                </button>
                <ul class="dropdown-menu" role="menu">
                    {isAdmin &&<li><Link to="/registerOwner" onClick={this.handleRegisterOwner} className="nav_menu">Register Owner</Link></li>}
                    {isAdmin && <li><Link to= "/registerPet" onClick={this.handleEditOwner}>Edit Owner</Link></li>}
                    {isAdmin && <li><Link to="/editPet" onClick={this.handleRegisterPet}>Register Pet</Link></li>}
                    {isAdmin && <li><Link to="/editPet" onClick={this.handleEditPet}>Edit Pet</Link></li>}
                    <li><Link to="/" onClick={this.handleOnLogout}>Logout</Link></li>
                </ul>
            </div>
        }

        return <nav className="navbar navbar-dark bg-dark">
            <div>
            <img className= "logo" src={logo} alt=""></img><div className="name__vet">St James Vet</div>
            </div>
            <div className="information__vet">
                <div>Weekdays: 10:00am - 8:00pm</div>
                <div>Saturday: 9:00am - 2:00 pm</div>
            </div>
            <div className='navmenu'>
                {!isLoggedIn && <button onClick={this.handleOnLogin} className='button'>Login</button>}
               
                {isLoggedIn && dropdownButton}
                <div className="btn-group">
                </div>
            </div>
        </nav>
    }
}

export default withRouter(Nav)