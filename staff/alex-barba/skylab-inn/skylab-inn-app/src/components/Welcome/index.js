import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

export default function Welcome({ onToSearch, onToAdvancedSearch, onToWelcome ,onToProfile, onToSignOut}) {

    const { userData, userName } = useContext(AppContext)

    const handleToSearch = () => {
        onToSearch()
    }

    const handleToAdvancedSearch = () => {
        onToAdvancedSearch()
    }

    const handleToWelcome = () => {
        onToWelcome()
    }

    const handleToProfile = () => {
        onToProfile()
    }

    const handleToSignOut = () => {
        onToSignOut()
    }

    return (
        <section>
            <h2>Hi {userData.name} </h2>
            <a onClick={handleToSearch}>Look for a Skylaber</a>
            <a onClick={handleToAdvancedSearch}>Advanced search</a>
            <nav>
                <a onClick={handleToWelcome}>Home</a>
                <a onClick={handleToProfile}>Profile</a>
                <a onClick={handleToSignOut}>Sign Out</a>
            </nav>
        </section>
    )

}