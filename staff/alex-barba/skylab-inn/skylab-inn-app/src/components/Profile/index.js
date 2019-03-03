import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

export default function Profile({ onToWelcome }) {

    const { userName } = useContext(AppContext)

    const handleToWelcome = () => {
        onToWelcome()
    }

    return (
        <section>
            <h2>Hi {userName} </h2>
            <p>Update your profile</p>
            <button onClick={handleToWelcome}>Home</button>
        </section>
    )

}