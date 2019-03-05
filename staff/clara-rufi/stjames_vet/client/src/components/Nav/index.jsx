import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import logic from '../../logic'

import './index.sass'

class Nav extends Component {
   
    state = { isLogin: logic.__userToken__ }

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
        this.setState({isLogin: null})
    }

    handleRegisterPet = event => {
        event.preventDefault()
        this.props.history.push('/registerPet')
    }
    render() {
        const isLogin = this.state.isLogin
        let dropdownButton

        if (isLogin) {
            dropdownButton = <div className="btn-group">

                <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    <i className="fas fa-paw"></i>
                </button>
                <ul class="dropdown-menu" role="menu">
                    <li><Link to="/registerOwner" onClick={this.handleRegisterOwner}>Register Owner</Link></li>
                    <li><Link to= "/registerPet" onClick={this.handleEditOwner}>Edit Owner</Link></li>
                    <li><Link to="/editPet" onClick={this.handleRegisterPet}>Register Pet</Link></li>
                    <li><Link to="/editPet" onClick={this.handleEditPet}>Edit Pet</Link></li>
                    <li><Link to="/" onClick={this.handleOnLogout}>Logout</Link></li>
                </ul>
            </div>
        }

        return <nav className="navbar navbar-dark bg-dark">
            <div className="name__vet">St James Vet</div>
            <div className="information__vet">
                <div>Weekdays: 10:00am - 8:00pm</div>
                <div>Saturday: 9:00am - 2:00 pm</div>
            </div>
            <div className='navmenu'>
                {!isLogin && <button onClick={this.handleOnLogin} className='button'>Login</button>}
               
                {isLogin && dropdownButton}
                {this.state.logic__userApiToken__ && dropdownButton}
                <div className="btn-group">
                </div>
            </div>
        </nav>
    }
}

export default withRouter(Nav)