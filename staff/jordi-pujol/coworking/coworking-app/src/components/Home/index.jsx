'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Profile from '../Profile'
import Inbox from '../Inbox'
import NewService from '../Create-service'
import Topbar from '../Topbar';
import logic from '../../logic';
import NewInvitation from '../New-invitation';

class Home extends Component {

    state = { services: '', link: null }

    handleGoToHome = () => this.props.history.push('/home/inbox')

    handleGoToProfile = () => this.props.history.push('/home/profile')

    handleGoToServices = () => this.props.history.push('/home/service')

    handleGoToNotifications = () => this.props.history.push('/home/notifications')

    handleCreateNewLink = () => {
        
        logic.createNewUserLink()
            .then(result => this.setState({ link: result }), this.props.history.push('/home/invitation'))
        
        // .then((result) => console.log(result + 'dsadsadsadsadds'))
        // .then(() => this.props.history.push('/home/notifications'))
    }

    handleLogOut = () => {
        logic.logOutUser()

        this.props.history.push('/login')
    }

    handleCreateService = (title, description, maxUsers, place) => {

        logic.createService(title, description, maxUsers, place)
            .then(() => this.props.history.push('/home'))
    }

    render() {

        const { state: { link }, handleGoToHome, handleGoToNotifications, handleGoToProfile, handleGoToServices, handleLogOut, handleCreateNewLink, handleCreateService, invitation } = this

        return <section>
            <Topbar onGoToHome={handleGoToHome} onGoToNotifications={handleGoToNotifications} onGoToProfile={handleGoToProfile} onGoToServices={handleGoToServices} onCreatingNewLink={handleCreateNewLink} onLogOut={handleLogOut} />
            <Route exact path='/home/profile' render={() => <Profile />} />
            <Route path='/home/inbox' render={() => <Inbox />} />
            <Route path='/home/service' render={() => <NewService onCreateService={handleCreateService} />} />
            <Route path='/home/invitation' render={() => <NewInvitation invitation={link} /> } />
            {/* <Route exact path='/home/inbox' render={()=> services && <Service services={services}/>}/> */}
        </section>
    }
}

export default withRouter(Home)
