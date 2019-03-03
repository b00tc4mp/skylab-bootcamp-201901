import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

export default function Welcome({ onToSearch, onToAdvancedSearch, onToProfile }) {

    const { userName } = useContext(AppContext)

    const handleToSearch = () => {
        onToSearch()
    }

    const handleToAdvancedSearch = () => {
        onToAdvancedSearch()
    }

    const handleToProfile = () => {
        onToProfile()
    }

    return (
        <section>
            <h2>Hi {userName} </h2>
            <a onClick={handleToSearch}>Look for a Skylaber</a>
            <a onClick={handleToAdvancedSearch}>Advanced search</a>
            <button onClick={handleToProfile}>Profile</button>
        </section>
    )

}