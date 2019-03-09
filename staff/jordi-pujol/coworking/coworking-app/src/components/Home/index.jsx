'use strict'

import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'

import Profile from '../Profile'
import Inbox from '../Inbox'
import NewService from '../Create-service'
import Topbar from '../Topbar';
import logic from '../../logic';

class Home extends Component {

    state = {services: ''}

    handleGoToHome = () => this.props.history.push('/home')

    handleGoToProfile = () => this.props.history.push('/home/profile')

    handleGoToServices = () => this.props.history.push('/home/services')

    handleGoToNotifications = () => this.props.history.push('/home/notifications')

    handleCreateNewLink = () => {
        logic.createNewUserLink()
            .then((result) => console.log(result + 'dsadsadsadsadds'))
            .then(() => this.props.history.push('/home/notifications'))
    }

    handleLogOut = () => {
        logic.logOutUser()

        this.props.history.push('/login')
    }

    handleCreateService = (title, description) => {
        logic.createService(title, description)
            .then(() => this.props.history.push('/home'))
    }

    render() {

        const { handleGoToHome, handleGoToNotifications, handleGoToProfile, handleGoToServices, handleLogOut, handleCreateNewLink, handleCreateService } = this

        return <section>
            <Topbar onGoToHome={handleGoToHome} onGoToNotifications={handleGoToNotifications} onGoToProfile={handleGoToProfile} onGoToServices={handleGoToServices} onCreatingNewLink={handleCreateNewLink} onLogOut={handleLogOut} />
            <Route exact path='/home/profile' render={() => <Profile />} />
            <Route path='/home/inbox' render={() => <Inbox />} />
            <Route path='/home/service' render={() => <NewService onCreateService={handleCreateService} />} />
            {/* <Route exact path='/home/inbox' render={()=> services && <Service services={services}/>}/> */}
        </section>
    }
}

export default withRouter(Home)