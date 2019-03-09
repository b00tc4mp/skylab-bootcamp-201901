import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

export default function Welcome({ onToSearch, onToAdvancedSearch, onToManageSkylabers }) {

    const { userData } = useContext(AppContext)

    const handleToSearch = () => {
        onToSearch()
    }

    const handleToAdvancedSearch = () => {
        onToAdvancedSearch()
    }

    const handleToManageSkylabers = () => {
        onToManageSkylabers()
    }



    return (
        <section>
            <h2>Hi {userData.name} </h2>
            <a onClick={handleToSearch}>Look for a Skylaber</a>
            <a onClick={handleToAdvancedSearch}>Advanced search</a>
            {userData.role === 'Admin' && <a onClick={handleToManageSkylabers}>Manage Skylabers</a>}
        </section>
    )

}