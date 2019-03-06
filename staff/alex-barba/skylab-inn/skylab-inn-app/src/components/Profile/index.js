import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

export default function Profile({ onToWelcome, onToProfile, onToSignOut, onUpdatePersonalInfo }) {

    const { feedback, userData, setUserData, typeOfUser } = useContext(AppContext)

    const { name, surname, email, telephone, git, linkedin, slack, workExperience, technology, language, education } = userData

    const [edit, setEdit] = useState(null)
    const [_email, setEmail] = useState(email)
    const [_telephone, setTelephone] = useState(telephone)
    const [_git, setGit] = useState(git)
    const [_linkedin, setLinkedin] = useState(linkedin)
    const [_slack, setSlack] = useState(slack)

    const handleUpdatePersonalInfo = e => {
        e.preventDefault()
        setEdit(false)
        onUpdatePersonalInfo(_email, _telephone, _git, _linkedin, _slack)
    }

    const handleOnEdit = () => {
        setEdit(true)
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
            <h2>Hi {name} </h2>
            <p>Update your profile</p>
                <section>
                    <section>
                        <h4>{name} {surname}</h4>
                    </section>
                    <section>
                        <h5>Personal Information</h5>
                        <a onClick={handleOnEdit}>Edit Personal Information</a>
                        {!edit ? <div><a href={`mailto:${email}`} target='_top'>@: {email ? email : ''}</a>
                        <a href={`tel:${telephone}`}>Phone: {telephone}</a>
                        <a href={`${git}`} target='_blank'>GIT: {git}</a>
                        <a href={`${linkedin}`} target='_blank'>LinkedIn: {linkedin}</a>
                        <a href={`https://skylabcoders.slack.com/messages/${slack}`} target='_blank'>Slack ID: {slack}</a></div>
                        : <form onSubmit={handleUpdatePersonalInfo}><input type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} defaultValue={email}></input>
                        <input type='text' name='telephone' placeholder='Telephone' onChange={e => setTelephone(e.target.value)} defaultValue={telephone}></input>
                        <input type='text' name='git' placeholder='Git' onChange={e => setGit(e.target.value)} defaultValue={git}></input>
                        <input type='text' name='linkedin' placeholder='Linkedin' onChange={e => setLinkedin(e.target.value)} defaultValue={linkedin}></input>
                        <input type='text' name='slack' placeholder='Slack Id' onChange={e => setSlack(e.target.value)} defaultValue={slack}></input>
                        <button type="submit">Update</button></form>}
                    </section> 
                    <section>
                        <h5>Work Experience</h5>
                        {workExperience && workExperience.map(exp => {
                            return <div>
                                <p>{exp.company}</p>
                                <p>{exp.position}</p>
                                <p>{exp.startDate}</p>
                                {exp.current ? <p>Current Job <input type='checkbox' name='currentJob' checked></input></p> : <p>{exp.endDate}</p>}
                            </div>
                            })
                        }
                    </section>
                    <section>
                        <h5>Technology</h5>
                        {technology && technology.map(tech => <p>Tech: {tech.tech}. Level: {tech.level}</p>)}
                    </section>
                    <section>
                        <h5>Languages</h5>
                        {language && language.map(language => <p>Language: {language.language}. Level: {language.level}</p>)}
                    </section>
                    <section>
                        <h5>Education</h5>
                        {education && education.map(edu => {
                            return <div>
                                <p>{edu.college}</p>
                                <p>{edu.degree}</p>
                            </div>
                        })
                        }
                        {feedback && <Feedback />}
                    </section>
                </section>
            <nav>
                <a onClick={handleToWelcome}>Home</a>
                <a onClick={handleToProfile}>Profile</a>
                <a onClick={handleToSignOut}>Sign Out</a>
            </nav>
        </section>
    )

}