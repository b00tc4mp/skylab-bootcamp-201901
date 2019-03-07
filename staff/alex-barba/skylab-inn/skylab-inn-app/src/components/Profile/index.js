import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../AppContext'
import Feedback from '../Feedback'

export default function Profile({ onToWelcome, onToProfile, onToSignOut, onUpdatePersonalInfo, onAddInformation, onUpdateInformation, onRemoveInformation }) {

    const { feedback, userData } = useContext(AppContext)

    const { name, surname, email, telephone, git, linkedin, slack, workExperience, technology, language, education } = userData

    const [editPersonal, setEditPersonal] = useState(null)
    const [_email, setEmail] = useState(email)
    const [_telephone, setTelephone] = useState(telephone)
    const [_git, setGit] = useState(git)
    const [_linkedin, setLinkedin] = useState(linkedin)
    const [_slack, setSlack] = useState(slack)

    const [addWorkExperience, setAddWorkExperience] = useState(null)
    const [editWork, setEditWork] = useState(null)
    const [_company, setCompany] = useState('')
    const [_position, setPosition] = useState('')
    const [_startDate, setStartDate] = useState('')
    const [_endDate, setEndDate] = useState('')
    const [_current, setCurrent] = useState('')

    const [addTechnology, setAddTechnology] = useState(null)
    const [editTechnology, setEditTechnology] = useState(null)
    const [_tech, setTech] = useState('')
    const [_levelTech, setLevelTech] = useState('')

    const [addLanguage, setAddLanguage] = useState(null)
    const [editLanguage, setEditLanguage] = useState(null)
    const [_language, setLanguage] = useState('')
    const [_levelLanguage, setLevelLanguage] = useState('')

    const [addEducation, setAddEducation] = useState(null)
    const [editEducation, setEditEducation] = useState(null)
    const [_college, setCollege] = useState('')
    const [_degree, setDegree] = useState('')

    const handleUpdatePersonalInfo = e => {
        e.preventDefault()
        setEditPersonal(null)
        onUpdatePersonalInfo(_email, _telephone, _git, _linkedin, _slack)
    }

    const handleAddInformation = (e, type) => {
        e.preventDefault()

        switch (type) {
            case 'Work':
                setAddWorkExperience(null)
                onAddInformation(type, { company: _company, position: _position, startDate: _startDate, endDate: _endDate, current: _current })
                break;
            case 'Tech':
                setAddTechnology(null)
                onAddInformation(type, { tech: _tech, level: _levelTech })
                break;
            case 'Language':
                setAddLanguage(null)
                onAddInformation(type, { language: _language, level: _levelLanguage })
                break;
            case 'Education':
                setAddEducation(null)
                onAddInformation(type, { college: _college, degree: _degree })
                break;
        }
    }

    const handleUpdateInformation = (e, type, id) => {
        e.preventDefault()

        switch (type) {
            case 'Work':
                setEditWork(null)
                onUpdateInformation(id, type, { company: _company, position: _position, startDate: _startDate, endDate: _endDate, current: _current })
                break;
            case 'Tech':
                setEditTechnology(null)
                onUpdateInformation(id, type, { tech: _tech, level: _levelTech })
                break;
            case 'Language':
                setEditLanguage(null)
                onUpdateInformation(id, type, { language: _language, level: _levelLanguage })
                break;
            case 'Education':
                setEditEducation(null)
                onUpdateInformation(id, type, { college: _college, degree: _degree })
                break;
        }
    }

    const handleRemoveInformation = (e, type, id) => {
        e.preventDefault()

        switch (type) {
            case 'Work':
                onRemoveInformation(id, type)
                break;
            case 'Tech':
                onRemoveInformation(id, type)
                break;
            case 'Language':
                onRemoveInformation(id, type)
                break;
            case 'Education':
                onRemoveInformation(id, type)
                break;
        }
    }

    const handleOnEditPersonalInfo = () => {
        if (addWorkExperience || editWork || editPersonal || addTechnology || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setEditPersonal(true)
        }
    }

    const handleOnAddWork = () => {
        if (editPersonal || editWork || addTechnology || addWorkExperience || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setAddWorkExperience(true)
        }
    }

    const handleOnEditWork = id => {
        if (editPersonal || addWorkExperience || editWork || addTechnology || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setEditWork(id)
        }
    }

    const handleOnAddTechnology = () => {
        if (editPersonal || addWorkExperience || editWork || addTechnology || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setAddTechnology(true)
        }
    }

    const handleOnEditTech = id => {
        if (editPersonal || addWorkExperience || editWork || addTechnology || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setEditTechnology(id)
        }
    }

    const handleOnAddLanguage = () => {
        if (editPersonal || addWorkExperience || editWork || addTechnology || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setAddLanguage(true)
        }
    }

    const handleOnEditLanguage = id => {
        if (editPersonal || addWorkExperience || editWork || addTechnology || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setEditLanguage(id)
        }
    }

    const handleOnAddEducation = () => {
        if (editPersonal || addWorkExperience || editWork || addTechnology || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setAddEducation(true)
        }
    }

    const handleOnEditEducation = id => {
        if (editPersonal || addWorkExperience || editWork || addTechnology || editTechnology || addLanguage || editLanguage || addEducation || editEducation) {
            return
        } else {
            setEditEducation(id)
        }
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
                    <a onClick={handleOnEditPersonalInfo}>Edit Personal Information</a>
                    {!editPersonal ? <div><a href={`mailto:${email}`} target='_top'>@: {email ? email : ''}</a>
                        <a href={`tel:${telephone}`}>Phone: {telephone}</a>
                        <a href={`${git}`} target='_blank'>GIT: {git}</a>
                        <a href={`${linkedin}`} target='_blank'>LinkedIn: {linkedin}</a>
                        <a href={`https://skylabcoders.slack.com/messages/${slack}`} target='_blank'>Slack ID: {slack}</a></div>
                        : <form onSubmit={e => handleUpdatePersonalInfo(e)}><input type='email' name='email' placeholder='Email' onChange={e => setEmail(e.target.value)} defaultValue={email} required></input>
                            <input type='text' name='telephone' placeholder='Telephone' onChange={e => setTelephone(e.target.value)} defaultValue={telephone}></input>
                            <input type='text' name='git' placeholder='Git' onChange={e => setGit(e.target.value)} defaultValue={git}></input>
                            <input type='text' name='linkedin' placeholder='Linkedin' onChange={e => setLinkedin(e.target.value)} defaultValue={linkedin}></input>
                            <input type='text' name='slack' placeholder='Slack Id' onChange={e => setSlack(e.target.value)} defaultValue={slack}></input>
                            <button type="submit">Update</button></form>
                    }
                </section>
                <section>
                    <h5>Work Experience</h5>
                    <a onClick={e => { e.preventDefault(); handleOnAddWork() }}>Add Work Experience</a>
                    {addWorkExperience && <form onSubmit={e => handleAddInformation(e, 'Work')}><input type='text' name='company' placeholder='Company' onChange={e => setCompany(e.target.value)} required></input>
                        <input type='text' name='position' placeholder='Position' onChange={e => setPosition(e.target.value)} required></input>
                        <input type='date' name='startDate' placeholder='Start date' onChange={e => setStartDate(e.target.value)} defaultValue={new Date().toISOString().substr(0, 10)} required></input>
                        {_current ? null : <input type='date' name='endDate' placeholder='End Date' onChange={e => setEndDate(e.target.value)} defaultValue={new Date().toISOString().substr(0, 10)} ></input>}
                        <p>Current Job <input type='checkbox' name='current' onChange={e => setCurrent(e.target.checked)} ></input></p>
                        <button type="submit">Add</button></form>}
                    {workExperience && workExperience.map(exp => {
                        return <div>
                            <a onClick={e => { e.preventDefault(); handleOnEditWork(exp._id) }}>Edit Work Experience</a>
                            <a onClick={e => handleRemoveInformation(e, 'Work', exp._id)}>Remove Work Experience</a>
                            {editWork === exp._id ?
                                <form onSubmit={e => handleUpdateInformation(e, 'Work', exp._id)}>
                                    <input type='text' name='company' placeholder='Company' onChange={e => setCompany(e.target.value)} defaultValue={exp.company} required></input>
                                    <input type='text' name='position' placeholder='Position' onChange={e => setPosition(e.target.value)} defaultValue={exp.position} required></input>
                                    <input type='date' name='startDate' placeholder='Start date' onChange={e => setStartDate(e.target.value)} defaultValue={new Date(exp.startDate).toISOString().substr(0, 10)} required></input>
                                    {_current ? null : <input type='date' name='endDate' placeholder='End Date' onChange={e => setEndDate(e.target.value)} defaultValue={new Date(exp.endDate).toISOString().substr(0, 10)}></input>}
                                    <p>Current Job <input type='checkbox' name='current' onChange={e => setCurrent(e.target.checked)} defaultChecked={exp.current}></input></p>
                                    <button type="submit">Update</button>
                                </form>
                                :
                                <div><p>{exp.company}</p>
                                    <p>{exp.position}</p>
                                    <p>{new Date(exp.startDate).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
                                    {exp.current ? <p>Current Job <input type='checkbox' name='current' checked></input></p> : <p>{new Date(exp.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>}
                                </div>
                            }
                        </div>
                    })
                    }
                </section>
                <section>
                    <h5>Technology</h5>
                    <a onClick={e => { e.preventDefault(); handleOnAddTechnology() }}>Add Technology</a>
                    {addTechnology && <form onSubmit={e => handleAddInformation(e, 'Tech')}>
                        <input type='text' name='technology' placeholder='Technology' onChange={e => setTech(e.target.value)} required></input>
                        <select className='dropdown-content' onChange={e => setLevelTech(e.target.value)}>
                            <option>Choose a level</option>
                            <option value='Fundamental awareness'>Fundamental awareness</option>
                            <option value='Novice'>Novice</option>
                            <option value='Intermediate'>Intermediate</option>
                            <option value='Advance'>Advance</option>
                            <option value='Expert'>Expert</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>}
                    {technology && technology.map(tech => {
                        return <div>
                            <a onClick={e => { e.preventDefault(); handleOnEditTech(tech._id) }}>Edit Tech</a>
                            <a onClick={e => handleRemoveInformation(e, 'Tech', tech._id)}>Remove Tech Skill</a>
                            {editTechnology === tech._id ?
                                <form onSubmit={e => handleUpdateInformation(e, 'Tech', tech._id)}>
                                    <input type='text' name='technology' placeholder='Technology' onChange={e => setTech(e.target.value)} defaultValue={tech.tech} required></input>
                                    <select className='dropdown-content' onChange={e => setLevelTech(e.target.value)}>
                                        <option>Choose a level</option>
                                        <option value='Fundamental awareness'>Fundamental awareness</option>
                                        <option value='Novice'>Novice</option>
                                        <option value='Intermediate'>Intermediate</option>
                                        <option value='Advance'>Advance</option>
                                        <option value='Expert'>Expert</option>
                                    </select>
                                    <button type="submit">Update</button>
                                </form>
                                :
                                <div>
                                    <p>Tech: {tech.tech}. Level: {tech.level}</p>
                                </div>
                            }
                        </div>
                    })
                    }
                </section>
                <section>
                    <h5>Language</h5>
                    <a onClick={e => { e.preventDefault(); handleOnAddLanguage() }}>Add Language</a>
                    {addLanguage && <form onSubmit={e => handleAddInformation(e, 'Language')}>
                        <input type='text' name='language' placeholder='Language' onChange={e => setLanguage(e.target.value)} required></input>
                        <select className='dropdown-content' onChange={e => setLevelLanguage(e.target.value)}>
                            <option>Choose a level</option>
                            <option value='Elementary proficiency'>Elementary proficiency</option>
                            <option value='Limited working proficiency'>Limited working proficiency</option>
                            <option value='Professional working proficiency'>Professional working proficiency</option>
                            <option value='Full professional proficiency'>Full professional proficiency</option>
                            <option value='Native or bilingual proficiency'>Native or bilingual proficiency</option>
                        </select>
                        <button type="submit">Add</button>
                    </form>}
                    {language && language.map(lang => {
                        return <div>
                            <a onClick={e => { e.preventDefault(); handleOnEditLanguage(lang._id) }}>Edit Language</a>
                            <a onClick={e => handleRemoveInformation(e, 'Language', lang._id)}>Remove Language Skill</a>
                            {editLanguage === lang._id ?
                                <form onSubmit={e => handleUpdateInformation(e, 'Language', lang._id)}>
                                    <input type='text' name='language' placeholder='Language' onChange={e => setLanguage(e.target.value)} defaultValue={lang.language} required></input>
                                    <select className='dropdown-content' onChange={e => setLevelLanguage(e.target.value)}>
                                        <option>Choose a level</option>
                                        <option value='Elementary proficiency'>Elementary proficiency</option>
                                        <option value='Limited working proficiency'>Limited working proficiency</option>
                                        <option value='Professional working proficiency'>Professional working proficiency</option>
                                        <option value='Full professional proficiency'>Full professional proficiency</option>
                                        <option value='Native or bilingual proficiency'>Native or bilingual proficiency</option>
                                    </select>
                                    <button type="submit">Update</button>
                                </form>
                                :
                                <div>
                                    <p>Language: {lang.language}. Level: {lang.level}</p>
                                </div>
                            }
                        </div>
                    })
                    }
                </section>
                <section>
                    <h5>Education</h5>
                    <a onClick={e => { e.preventDefault(); handleOnAddEducation() }}>Add Education</a>
                    {addEducation && <form onSubmit={e => handleAddInformation(e, 'Education')}>
                        <input type='text' name='education' placeholder='College' onChange={e => setCollege(e.target.value)} required></input>
                        <input type='text' name='education' placeholder='Degree' onChange={e => setDegree(e.target.value)} required></input>
                        <button type="submit">Add</button>
                    </form>}
                    {education && education.map(edu => {
                        return <div>
                            <a onClick={e => { e.preventDefault(); handleOnEditEducation(edu._id) }}>Edit Education</a>
                            <a onClick={e => handleRemoveInformation(e, 'Education', edu._id)}>Remove Education</a>
                            {editEducation === edu._id ?
                                <form onSubmit={e => handleUpdateInformation(e, 'Education', edu._id)}>
                                    <input type='text' name='education' placeholder='College' onChange={e => setCollege(e.target.value)} defaultValue={edu.college} required></input>
                                    <input type='text' name='education' placeholder='Degree' onChange={e => setDegree(e.target.value)} defaultValue={edu.degree} required></input>
                                    <button type="submit">Update</button>
                                </form>
                                :
                                <div>
                                    <p>{edu.college}</p>
                                    <p>{edu.degree}</p>
                                </div>
                            }
                        </div>
                    })
                    }
                </section>
                <section>
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