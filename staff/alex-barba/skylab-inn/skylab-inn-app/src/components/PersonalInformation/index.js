import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

export default function PersonalInformation({ onEditPersonalInfo, onUpdatePersonalInfo, editPersonal, onCancel }) {

    const { userData } = useContext(AppContext)

    const { email, telephone, git, linkedin, slack } = userData

    const [_email, setEmail] = useState(email)
    const [_telephone, setTelephone] = useState(telephone)
    const [_git, setGit] = useState(git)
    const [_linkedin, setLinkedin] = useState(linkedin)
    const [_slack, setSlack] = useState(slack)

    const handleOnEditPersonalInfo = () => {
        onEditPersonalInfo()
    }

    const handleUpdatePersonalInfo = e => {
        e.preventDefault()
        onUpdatePersonalInfo({ email: _email, telephone: _telephone, git: _git, linkedin: _linkedin, slack: _slack })
    }

    const handleOnCancelEditOrAdd = () => {
        onCancel()
    }

    return (
        <section>
            <a onClick={handleOnEditPersonalInfo}>Edit Personal Information</a>
            {!editPersonal ? <div>
                <a href={`mailto:${email}`} target='_top'>@: {email ? email : ''}</a>
                <a href={`tel:${telephone}`}>Phone: {telephone}</a>
                <a href={`${git}`} target='_blank'>GIT: {git}</a>
                <a href={`${linkedin}`} target='_blank'>LinkedIn: {linkedin}</a>
                <a href={`https://skylabcoders.slack.com/messages/${slack}`} target='_blank'>Slack ID: {slack}</a></div>
                : <form onSubmit={e => handleUpdatePersonalInfo(e)}>
                    <input type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} defaultValue={email} required></input>
                    <input type='text' name='telephone' placeholder='Telephone' onChange={e => setTelephone(e.target.value)} defaultValue={telephone}></input>
                    <input type='text' name='git' placeholder='Git' onChange={e => setGit(e.target.value)} defaultValue={git}></input>
                    <input type='text' name='linkedin' placeholder='Linkedin' onChange={e => setLinkedin(e.target.value)} defaultValue={linkedin}></input>
                    <input type='text' name='slack' placeholder='Slack Id' onChange={e => setSlack(e.target.value)} defaultValue={slack}></input>
                    <button type="submit">Update</button><button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button></form>
            }
        </section>

    )
}