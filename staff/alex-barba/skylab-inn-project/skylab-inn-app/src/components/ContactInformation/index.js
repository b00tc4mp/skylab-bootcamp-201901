import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function ContactInformation({ onEditPersonalInfo, onUpdatePersonalInfo, editPersonal, onCancel }) {

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
        <div className='contactInfo-container'>
            <div className='contactInfo-container__header'>
                <h5>Contact Information</h5>
                <i className='fas fa-pencil-alt icon icon--link' onClick={handleOnEditPersonalInfo}></i>
            </div>
            {!editPersonal ? <div className='contactInfo-container__content'>
                <div className='line'/> 
                <a href={`mailto:${email}`} target='_top'><i className='far fa-envelope icon'></i>&nbsp;{email ? email : ''}</a>
                <a href={`https://api.whatsapp.com/send?phone=${telephone}`} target='_blank' rel="noopener noreferrer"><i className='fab fa-whatsapp icon'></i>&nbsp;{telephone}</a>
                <a href={`https://github.com/${git}`} target='_blank' rel="noopener noreferrer"><i className='fab fa-github icon'></i>&nbsp;{git}</a>
                <a href={`https://www.linkedin.com/in/${linkedin}`} target='_blank' rel="noopener noreferrer"><i className='fab fa-linkedin icon'></i>&nbsp;{linkedin}</a>
                <a href={`https://skylabcoders.slack.com/messages/${slack}`} target='_blank' rel="noopener noreferrer"><i className='fab fa-slack icon'></i>&nbsp;{slack}</a></div>
                : <form className='contactInfo-container__form' onSubmit={e => handleUpdatePersonalInfo(e)}>
                    <div className='line'/> 
                    <div className='contactInfo-container__form-input'>
                        <i className='far fa-envelope icon'></i>&nbsp;
                        <input type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} defaultValue={email} required></input>
                    </div>
                    <div className='contactInfo-container__form-input'>
                        <i className='fab fa-whatsapp icon'></i>&nbsp;
                        <input type='number' name='telephone' placeholder='Telephone' onChange={e => setTelephone(e.target.value)} defaultValue={telephone}></input>
                    </div>
                    <div className='contactInfo-container__form-input'>
                        <i className='fab fa-github icon'></i>&nbsp;
                        <input type='text' name='git' placeholder='GitHub Account' onChange={e => setGit(e.target.value)} defaultValue={git}></input>
                    </div>
                    <div className='contactInfo-container__form-input'>
                        <i className='fab fa-linkedin icon'></i>&nbsp;
                        <input type='text' name='linkedin' placeholder='Linkedin Cutom URL' onChange={e => setLinkedin(e.target.value)} defaultValue={linkedin}></input>
                    </div>
                    <div className='contactInfo-container__form-input'>
                        <i className='fab fa-slack icon'></i>&nbsp;
                        <input type='text' name='slack' placeholder='Slack Id' onChange={e => setSlack(e.target.value)} defaultValue={slack}></input>
                    </div>
                    <button className='btn btn--success' type='submit'>Update</button>
                    <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                </form>
            }
        </div>

    )
}