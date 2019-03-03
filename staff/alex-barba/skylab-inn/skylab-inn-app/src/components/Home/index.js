'use strict'

import React, { useContext, useEffect, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Welcome from '../Welcome'
import Search from '../Search'
import AdvancedSearch from '../AdvancedSearch'
import Profile from '../Profile'

function Home({history}) {

    const handleToSearch = () => {
        history.push('/home/search')
    }

    const handleToAdvancedSearch = () => {
        history.push('/home/adsearch')
    }

    const handleToProfile = () => {
        history.push('/home/profile')
    }

    const handleToWelcome = () =>{
        history.push('/home')
    }

    const handleSearch = query => {
        console.log(query)
    }

    const handleAdvancedSearch = query => {
        console.log(query)
    }


    return (
    <Fragment>
       <Route exact path="/home" render={() => <Welcome onToSearch={handleToSearch} onToAdvancedSearch={handleToAdvancedSearch} onToProfile={handleToProfile}/>}/>
       <Route path="/home/search" render={() => <Search onSearch={handleSearch} onToProfile={handleToProfile} onToWelcome={handleToWelcome}/>}/>
       <Route path="/home/adsearch" render={() => <AdvancedSearch onAdvancedSearch={handleAdvancedSearch} onToProfile={handleToProfile} onToWelcome={handleToWelcome}/>}/>
       <Route path="/home/profile" render={() => <Profile onToWelcome={handleToWelcome}/>}/>
    </Fragment>
    )
}

export default withRouter(Home)