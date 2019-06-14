import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

import './index.sass'

export default function ManagaSkylabers({ onSubmit }) {

    const { feedback, whiteList, unverifiedEmails } = useContext(AppContext)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')

    const handleFormSubmit = event => {
        event.preventDefault()
        onSubmit({name, surname, email})
        setName('')
        setSurname('')
        setEmail('')
    }

    return (
        <div className='manage'>
            <div className='manage-header'>
                <h2>Manage the Skylabers!</h2>
            </div>
            <div className='manage-form'>
                <div className='manage-form__header'>
                    <h2>Add a Skylaber</h2>
                </div>
                <form className='manage-form__form' onSubmit={handleFormSubmit}>
                    <input autoFocus type='text' name='name' placeholder='Name' onChange={e => setName(e.target.value)} required value={name}></input>
                    <input type='text' name='surname' placeholder='Surname' onChange={e => setSurname(e.target.value)} required value={surname}></input>
                    <input type='text' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} required value={email}></input>
                    <button className='btn btn--primary'type='submit'>Add</button>
                </form>
                {feedback && <Feedback />}
            </div>
            <div className='manage-pendSign'>
                <div className='manage-pendSign__header'>
                    <h2>Pending Signups</h2>
                </div>
                <div className='manage-pendSign__content'>
                    {whiteList && !!whiteList.length && whiteList.map(res => { return <p>{res.name}</p> })}
                    {whiteList && !whiteList.length && <p>No Skylabers pending to sign up</p>}
                </div>
            </div>
            <div className='manage-pendEmail'>
                <div className='manage-pendEmail__header'>
                <h2>Pending Email Verification</h2>
                </div>
                <div className='manage-pendEmail__content'>
                    {unverifiedEmails && !!unverifiedEmails.length && unverifiedEmails.map(res => { return <p>{res.name}</p> })}
                    {unverifiedEmails && !unverifiedEmails.length && <p>No Skylabers pending to verify email</p>}
                </div>
            </div>
        </div>
    )
}