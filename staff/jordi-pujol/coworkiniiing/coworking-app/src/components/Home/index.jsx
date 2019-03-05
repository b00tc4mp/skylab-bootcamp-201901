'use strict'

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Profile from '../Profile'
import Inbox from '../Inbox'
import Topbar from '../Topbar';
import logic from '../../logic';

class Home extends Component {

    handleGoToHome = () => this.props.history.push('/home')
    
    handleGoToProfile = () => this.props.history.push('/home/profile')

    handleGoToServices = () => this.props.history.push('/home/services')

    handleGoToNotifications = () => this.props.history.push('/home/notifications')

    handleCreateNewLink = () => {
        logic.createNewUserLink() // TODO logic
    }

    handleLogOut = () => {
        logic.logOutUser()
        
        this.props.history.push('/login')}

    render() {

        const { handleGoToHome, handleGoToNotifications, handleGoToProfile, handleGoToServices, handleLogOut } = this

        return <section>
            <Topbar onGoToHome={handleGoToHome} onGoToNotifications={handleGoToNotifications} onGoToProfile={handleGoToProfile} onGoToServices={handleGoToServices} onCreatingNewLink={handleCreateNewLink} onLogOut={handleLogOut} />
            <Route path='/home/profile' render={() => <Profile />} />
            <Route path='/inbox' render={() => <Inbox />} />
        </section>
    }
}

export default withRouter(Home)