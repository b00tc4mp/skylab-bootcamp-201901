import React, { useContext } from 'react'
import { AppContext } from '../AppContext'

import './index.sass'
import Technology from '../Technology';

export default function Skylaber({ onToBack }) {

    const { skylaber } = useContext(AppContext)

    const { name, surname, image, email, telephone, git, linkedin, slack, workExperience, technology, language, education } = skylaber

    const handleToBack = () => {
        onToBack()
    }

    return (
        <div className='skylaber'>
            <div className='skylaber-header'>
                <h2>Is this your Skylaber?</h2>
                <i className='fas fa-arrow-circle-left icon icon--link' onClick={handleToBack}></i>
            </div>
            {skylaber &&
                <div className='skylaber-container'>
                    <div className='skylaber-personalInformation-container'>
                        <div className='skylaber-personalInformation-container__name'>
                            <h4>{name}<br/>{surname}</h4>
                        </div>
                        <div className='skylaber-personalInformation-container__image'>
                            {image ? <img src={`${image}`}></img> : <img src='https://www.lagersmit.com/wp-content/uploads/2014/09/default_avatar-2.gif'></img> }
                        </div>
                    </div>
                    <div className='skylaber-data-container'>
                        <div className='skylaber-data-container__header'>
                            <h5 className='subtitle'>Contact Information</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {email && <a href={`mailto:${email}`} target='_top'><i className='far fa-envelope icon'></i>&nbsp;{email ? email : ''}</a>}
                            {telephone && <a href={`https://api.whatsapp.com/send?phone=${telephone}`} target='_blank'><i className='fab fa-whatsapp icon'></i>&nbsp;{telephone}</a>}
                            {git && <a href={`${git}`} target='_blank'><i className='fab fa-github icon'></i>&nbsp;{git}</a>}
                            {linkedin && <a href={`${linkedin}`} target='_blank'><i className='fab fa-linkedin icon'></i>&nbsp;{linkedin}</a>}
                            {slack && <a href={`https://skylabcoders.slack.com/messages/${slack}`} target='_blank'><i className='fab fa-slack icon'></i>&nbsp;{slack}</a>}
                        </div>
                    </div>
                    <div className='skylaber-data-container'>
                        <div className='skylaber-data-container__header'>
                            <h5 className='subtitle'>Work Experience</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {workExperience && workExperience.map(exp => {
                                return (
                                    <div className='wrapped-container'>
                                        <div className='line'/> 
                                        <div className='wrapped-container__content'>
                                            <p>{exp.company}</p>
                                            <p>{exp.position}</p>
                                            <p>{new Date(exp.startDate).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
                                            {exp.current ? <div className='checkbox'><input type='checkbox' id='current' name='current' checked/><label for='current'>&nbsp; Current job</label></div> : <p>{new Date(exp.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>}
                                        </div>
                                    </div>    
                                )
                            })}
                        </div>
                    </div>
                    <div className='skylaber-data-container'>
                        <div className='skylaber-data-container__header'>
                            <h5 className='subtitle'>Technologies</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {technology && technology.map(tech => {
                                return (
                                    <div className='wrapped-container'>
                                        <div className='line'/> 
                                        <div className='wrapped-container__content'>
                                            <p>{tech.tech}</p>
                                            <p>Level: {tech.level}</p>
                                        </div>
                                    </div>    
                                )
                            })}
                        </div>
                    </div>
                    <div className='skylaber-data-container'>
                        <div className='skylaber-data-container__header'>
                            <h5 className='subtitle'>Languages</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {language && language.map(lang => {
                                return (
                                    <div className='wrapped-container'>
                                        <div className='line'/> 
                                        <div className='wrapped-container__content'>
                                            <p>{lang.language}</p>
                                            <p>Level: {lang.level}</p>
                                        </div>
                                    </div>    
                                )
                            })}
                        </div>
                    </div>
                    <div className='skylaber-data-container'>
                        <div className='skylaber-data-container__header'>
                            <h5 className='subtitle'>Education</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {education && education.map(edu => {
                                return (
                                    <div className='wrapped-container'>
                                        <div className='line'/> 
                                        <div className='wrapped-container__content'>
                                            <p>{edu.college}</p>
                                            <p>Level: {edu.degree}</p>
                                        </div>
                                    </div>    
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}