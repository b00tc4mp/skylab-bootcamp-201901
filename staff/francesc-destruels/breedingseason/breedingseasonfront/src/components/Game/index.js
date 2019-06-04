import React, { Fragment, useContext, useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'

function Game() {

    // const { setUserData, userData } = useContext()

    const handleToSignOut = () => {
        logic.logoutUser() 
    }

    return <div> 
        <Logo/>
        <NavLvLs/> //For OneEggNest / TwoEggNest / ThreeEggNest / FourEggNest / Tools 
        <OptionCards/>
        <PenguinsMap/> // For 4 rows of penguins and each row security LvL 
    </div>
    
        // <Fragment>
        //     <Route exact path="/home" render={() => <div> Hello Hell! <button onClick={handleToSignOut}>LogOut!</button></div>} />
        // </Fragment>
}

export default withRouter(Home)