import React, { Fragment, useContext, useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'

function Home() {

    // const { setUserData, userData } = useContext()

    const handleToSignOut = () => {
        logic.logoutUser() 
    }

    return <div> Hello Hell! <button onClick={handleToSignOut}>LogOut!</button></div>
    
        // <Fragment>
        //     <Route exact path="/home" render={() => <div> Hello Hell! <button onClick={handleToSignOut}>LogOut!</button></div>} />
        // </Fragment>
}

export default withRouter(Home)