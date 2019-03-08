import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

export default function Welcome({ onToSearch, onToAdvancedSearch, onToAddSkylaber }) {

    const { userData } = useContext(AppContext)

    const handleToSearch = () => {
        onToSearch()
    }

    const handleToAdvancedSearch = () => {
        onToAdvancedSearch()
    }

    const handleToAddSkylaber = () => {
        onToAddSkylaber()
    }



    return (
        <section>
            <h2>Hi {userData.name} </h2>
            <a onClick={handleToSearch}>Look for a Skylaber</a>
            <a onClick={handleToAdvancedSearch}>Advanced search</a>
            {userData.role === 'Admin' && <a onClick={handleToAddSkylaber}>Add a Skylaber</a>}
        </section>
    )

}