import React, { useContext } from 'react'
import { AppContext } from '../AppContext'
import './index.sass'

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
        <div className='welcome-container'>
            <div className='welcome-container__header'>
                <h2>Welcome {userData.name}! <br/> What would you like to do?</h2>
            </div>
            <div className='welcome-container__menu'>
                <a onClick={handleToSearch}>Just a query? Click here!</a>
                <a onClick={handleToAdvancedSearch}>More than one? <br/>Then, click here!</a>
                {userData.role === 'Admin' && <a onClick={handleToManageSkylabers}>Manage Skylabers</a>}
            </div>
        </div>
    )

}