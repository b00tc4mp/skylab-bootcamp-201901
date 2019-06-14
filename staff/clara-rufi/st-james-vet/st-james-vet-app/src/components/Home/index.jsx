import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Nav from '../Nav'
import logic from '../../logic';

import cat_dog from '../images/cat_dog.png'
import Footer from '../Footer'

import './index.sass'

class Home extends Component {

    state = { isAdmin: logic.isAdmin }

    handleVisit = event => {
        event.preventDefault()
        this.props.history.push('/visit')
    }

    handleAppointments = event => {
        event.preventDefault()
        this.props.history.push('/appointments')
    }

    handleVisitOwner = event => {
        event.preventDefault()
        this.props.history.push('/visitOwner')
    }

    render() {

        const { state: { isAdmin } } = this

        return <Fragment>
            <Nav className="fixed"></Nav>
            <div className="home">
                {isAdmin && <button className="button__home" onClick={this.handleVisit}>Visit</button>}
                {isAdmin && <button className="button__home" onClick={this.handleAppointments}>Appointments</button>}
                <button className="button__home" onClick={this.handleVisitOwner}>Visit Owner</button>
            </div>
            <div>
                <img className="img__Home" src={cat_dog} alt=""></img>
            </div>
            <Footer className='fixed'></Footer>
        </Fragment>
    }

}


export default withRouter(Home)