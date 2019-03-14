import React, { useContext, useEffect } from 'react'
import { AppContext } from '../AppContext'
import logic from '../../logic'

export default function Profile({ onToWelcome, onToProfile, onToSignOut }) {

    const { userData, setUserData, typeOfUser } = useContext(AppContext)

    const { name, surname, email, telephone, git, linkedin, slack, workExperience, techs, languages, education } = userData

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
            { typeOfUser === 'User' ?
            <section>
                <section>
                    <h4>{name} {surname}</h4>
                </section> 
                <section>
                    <h5>Contact Information</h5>
                    <a href={`mailto:${email}`} target="_top">@: {email}</a>
                    {telephone && <a href={`tel:${telephone}`}>Phone: {telephone}</a>}
                    {git && <a href={`${git}`} target="_blank">GIT: {git}</a>}
                    {linkedin && <a href={`${linkedin}`} target="_blank">LinkedIn: {linkedin}</a>}
                    {slack && <a href={`https://skylabcoders.slack.com/messages/${slack}`} target="_blank">Slack ID: {slack}</a>}
                </section>
                <section>
                    <h5>Work Exprience</h5>
                    {workExperience && workExperience.map(exp => {
                        return<div>
                            <p>{exp.company}</p>
                            <p>{exp.position}</p>
                            <p>{exp.startDate}</p>
                            {exp.current? <p>Current Job <input type="checkbox" name="currentJob" checked></input></p> : <p>{exp.endDate}</p>}
                        </div> 
                        })
                    }
                </section>
                <section>
                    <h5>Techs</h5>
                    {techs && techs.map(tech => <p>{tech}</p>)}
                </section>
                <section>
                    <h5>Languages</h5>
                    {languages && languages.map(language => <p>{language}</p>)}
                </section>
                <section>
                    <h5>Education</h5>
                    {education && education.map(edu => {
                        return<div>
                            <p>{edu.college}</p>
                            <p>{edu.degree}</p>
                        </div> 
                        })
                    }
                </section>
            </section>

            : null
            }
            <nav>
                <a onClick={handleToWelcome}>Home</a>
                <a onClick={handleToProfile}>Profile</a>
                <a onClick={handleToSignOut}>Sign Out</a>
            </nav>
        </section>
    )

}