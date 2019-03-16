import React, { useEffect } from 'react'

import './index.sass'

export default function Skylaber({ onToBack, skylaberId, retrieveSkylaber, skylaber }) {

    useEffect(() => {
        retrieveSkylaber(skylaberId)
    },[skylaberId])
    
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
                            <h4>{skylaber.name}<br/>{skylaber.surname}</h4>
                        </div>
                        <div className='skylaber-personalInformation-container__image'>
                            {skylaber.image ? <img alt='default' src={`${skylaber.image}`}></img> : <img alt='uploaded' src='https://www.lagersmit.com/wp-content/uploads/2014/09/default_avatar-2.gif'></img> }
                        </div>
                    </div>
                    <div className='skylaber-data-container'>
                        <div className='skylaber-data-container__header'>
                            <h5>Contact Information</h5>
                        </div>
                        <div className='line'/> 
                        <div className='skylaber-data-container__content'>
                            {skylaber.email && <a href={`mailto:${skylaber.email}`} target='_top'><i className='far fa-envelope icon'></i>&nbsp;{skylaber.email ? skylaber.email : ''}</a>}
                            {skylaber.telephone && <a rel="noopener noreferrer" href={`https://api.whatsapp.com/send?phone=${skylaber.telephone}`} target='_blank'><i className='fab fa-whatsapp icon'></i>&nbsp;{skylaber.telephone}</a>}
                            {skylaber.git && <a rel="noopener noreferrer" href={`https://github.com/${skylaber.git}`} target='_blank'><i className='fab fa-github icon'></i>&nbsp;{skylaber.git}</a>}
                            {skylaber.linkedin && <a rel="noopener noreferrer" href={`https://www.linkedin.com/in/${skylaber.linkedin}`} target='_blank'><i className='fab fa-linkedin icon'></i>&nbsp;{skylaber.linkedin}</a>}
                            {skylaber.slack && <a rel="noopener noreferrer" href={`https://skylabcoders.slack.com/messages/${skylaber.slack}`} target='_blank'><i className='fab fa-slack icon'></i>&nbsp;{skylaber.slack}</a>}
                        </div>
                    </div>
                    <div className='skylaber-data-container'>
                        <div className='skylaber-data-container__header'>
                            <h5>Work Experience</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {skylaber.workExperience && skylaber.workExperience.map(exp => {
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
                            <h5>Technologies</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {skylaber.technology && skylaber.technology.map(tech => {
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
                            <h5>Languages</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {skylaber.language && skylaber.language.map(lang => {
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
                            <h5>Education</h5>
                        </div>
                        <div className='skylaber-data-container__content'>
                            {skylaber.education && skylaber.education.map(edu => {
                                return (
                                    <div className='wrapped-container'>
                                        <div className='line'/> 
                                        <div className='wrapped-container__content'>
                                            <p>{edu.college}</p>
                                            <p>{edu.degree}</p>
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