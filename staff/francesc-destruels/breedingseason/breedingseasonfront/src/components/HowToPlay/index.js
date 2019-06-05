import React, { useContext, useState } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import logic from '../../logic'
import Logo from "../Logo"

function HowToPLay({ history }) {

    const handleToSignOut = () => {
        logic.logoutUser()
        history.push('/')
    }

    const handleToGoBack = () => {
        history.push('/home')
    }


    return (
        <div> 
            <div>
                <Logo sizeX={"100px"} sizeY={"100px"} />
                <button onClick={handleToSignOut}>
                    LogOut!
                </button>
            </div>

            <h1>How to play!</h1>

            <button onClick={handleToGoBack}>
                    Go Back
                </button>
        </div>)
}

export default withRouter(HowToPLay)