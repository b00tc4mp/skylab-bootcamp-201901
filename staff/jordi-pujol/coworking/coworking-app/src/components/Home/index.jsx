'use strict'

import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

import Profile from '../Profile'
import Inbox from '../Inbox'
import NewService from '../Create-service'
import MyServices from '../MyServices'
import ServiceClosed from '../Service-to-close'
import SubmitedServices from '../SubmitedServices'
import Topbar from '../Topbar';
import logic from '../../logic';
import NewInvitation from '../New-invitation';
import ViewTime from '../View-time'

class Home extends Component {

    state = { services: '', link: null, createServiceFeedback: null, myTime: null }

    handleGoToHome = () => this.props.history.push('/home/inbox')

    handleGoToProfile = () => this.props.history.push('/home/profile')

    handleGoToServices = () => this.props.history.push('/home/service')

    handleCreateNewLink = () => {

        try {
            logic.createNewUserLink()
                .then(result => this.setState({ link: result }), this.props.history.push('/home/invitation'))
                .catch(({ message }) => this.setState({ createServiceFeedback: message }))
        }
        catch ({ message }) {
            this.setState({ createServiceFeedback: message })
        }
    }

    handleLogOut = () => {
        try {
            logic.logOutUser()
        }
        catch ({ message }) {
            console.error(message)
        }

    }

    handleCreateService = (title, description, maxUsers, place, time) => {

        try {
            logic.createService(title, description, maxUsers, place, time)
                .then(() => this.props.history.push('/home/inbox'))
                .catch(({ message }) => this.setState({ createServiceFeedback: message }))
        }
        catch ({ message }) {
            this.setState({ createServiceFeedback: message })
        }
    }

    handleViewTime = () => {
        try {
            logic.retrieveUser()
                .then(({time}) => this.setState({myTime: time}))
                .then(() => {
                    setTimeout(() => { this.setState({myTime: null}) }, 5000);
                })
        }
        catch({message}){
            this.setState({ createServiceFeedback: message })
        }
    }

    render() {

        const { state: { link, createServiceFeedback, myTime }, handleGoToHome, handleGoToNotifications, handleGoToProfile, handleGoToServices, handleLogOut, handleCreateNewLink, handleCreateService, handleViewTime } = this

        return <section className="home">
            <Topbar onGoToHome={handleGoToHome} onGoToNotifications={handleGoToNotifications} onGoToProfile={handleGoToProfile} onGoToServices={handleGoToServices} onCreatingNewLink={handleCreateNewLink} onLogOut={handleLogOut} onViewingTime={handleViewTime}/>
            {myTime && <ViewTime time={myTime}/>}
            <Route exact path='/home/profile' render={() => <Profile />} />
            <Route path='/home/inbox' render={() => <Inbox />} />
            <Route path='/home/service' render={() => <NewService feedback={createServiceFeedback} onCreateService={handleCreateService} />} />
            <Route path='/home/invitation' render={() => logic.isUserAdmin ? <NewInvitation invitation={link} /> : <Redirect to='/home/inbox' />} />
            <Route path='/home/myownservices' render={() => logic.isUserLoggedIn ? <MyServices /> : <Redirect to='/login' />} />
            <Route path='/home/myservices/closed' render={() => logic.isUserLoggedIn ? <ServiceClosed /> : <Redirect to='/login' />} />
            <Route path='/home/myservices/submited' render={() => logic.isUserLoggedIn ? <SubmitedServices /> : <Redirect to='/login' />} />
            {/* <Route exact path='/home/inbox' render={()=> services && <Service services={services}/>}/> */}
        </section>
    }
}

export default withRouter(Home)
