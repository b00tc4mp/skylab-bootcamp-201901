import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function WorkExperience({ onAddWork, onEditWork, onAddInformation, onRemoveInformation, onUpdateInformation, editWork, addWorkExperience, onCancel }) {

    const { userData, setFeedback } = useContext(AppContext)

    const { workExperience } = userData

    const [_company, setCompany] = useState('')
    const [_position, setPosition] = useState('')
    const [_startDate, setStartDate] = useState('')
    const [_endDate, setEndDate] = useState('')
    const [_current, setCurrent] = useState('')

    const handleOnEditWork = exp => {
        setCurrent(exp.current)
        onEditWork(exp._id)
    }

    const handleOnAddWork = () => {
        setCurrent(false)
        onAddWork()
    }

    const handleAddInformation = (e, type) => {
        e.preventDefault()
        if (new Date(_startDate) > new Date()) return setFeedback('Failed to add. Start date should not be greater than today.')

        if (_current) onAddInformation(type, { company: _company, position: _position, startDate: _startDate, current: _current })
        else  new Date(_endDate) > new Date(_startDate) ? onAddInformation(type, { company: _company, position: _position, startDate: _startDate, endDate: _endDate, current: _current }) : setFeedback('Failed to add. End date should be greater than the starting date.')
        
        setCurrent(false)
    }

    const handleUpdateInformation = (e, type, id) => {
        e.preventDefault()
        if (new Date(_startDate) > new Date()) return setFeedback('Failed to add. Start date should not be greater than today.')

        if (_current) onUpdateInformation(type, id, { company: _company, position: _position, startDate: _startDate, endDate: _endDate, current: _current })
        else  new Date(_endDate) > new Date(_startDate) ? onUpdateInformation(type, id, { company: _company, position: _position, startDate: _startDate, endDate: _endDate, current: _current }) : setFeedback('Failed to add. End date should be greater than the starting date.')
    }

    const handleRemoveInformation = (e, type, id) => {
        e.preventDefault()
        onRemoveInformation(type, id)
    }

    const handleOnCancelEditOrAdd = () => {
        onCancel()
    }

    return (
        <div className='workExp-container'>
            <div className='workExp-container__header'>
                <h5 className='subtitle'>Work Experience</h5>
                <i className='fas fa-plus-circle icon icon--link' onClick={e => { e.preventDefault(); handleOnAddWork() }}></i>
            </div>
            {addWorkExperience && <div className='workExp-container__form'><form onSubmit={e => handleAddInformation(e, 'Work')}><input type='text' name='company' placeholder='Company' onChange={e => setCompany(e.target.value)} required></input>
                <input type='text' name='position' placeholder='Position' onChange={e => setPosition(e.target.value)} required></input>
                <input type='date' name='startDate' placeholder='Start date' onChange={e => setStartDate(e.target.value)} defaultValue={new Date().toISOString().substr(0, 10)} required></input>
                {_current ? null : <input type='date' name='endDate' placeholder='End Date' onChange={e => setEndDate(e.target.value)} defaultValue={new Date().toISOString().substr(0, 10)} ></input>}
                &nbsp;<div className='checkbox'><input type='checkbox' id='current' name='current'  onChange={e => setCurrent(e.target.checked)}/><label for='current'>&nbsp; Current job</label></div>
                <div>
                    <button className='btn btn--success' type='submit'>Add</button>
                    <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                </div>
            </form>
            </div>}
            {workExperience && workExperience.sort((a,b) => new Date(b.startDate) - new Date(a.startDate)).map(exp => {
                return <div className='workExp-container__form'>
                    {editWork === exp._id ?
                        <form onSubmit={e => handleUpdateInformation(e, 'Work', exp._id)}>
                            <div className='line'/> 
                            <input type='text' name='company' placeholder='Company' onChange={e => setCompany(e.target.value)} defaultValue={exp.company} required></input>
                            <input type='text' name='position' placeholder='Position' onChange={e => setPosition(e.target.value)} defaultValue={exp.position} required></input>
                            <input type='date' name='startDate' placeholder='Start date' onChange={e => setStartDate(e.target.value)} defaultValue={new Date(exp.startDate).toISOString().substr(0, 10)} required></input>
                            {_current ? null : <input type='date' name='endDate' placeholder='End Date' onChange={e => setEndDate(e.target.value)} defaultValue={new Date(exp.endDate).toISOString().substr(0, 10)}></input>}
                            <div className='checkbox'><input type='checkbox' id='current' name='current'  onChange={e => setCurrent(e.target.checked)} defaultChecked={exp.current}/><label for='current'>&nbsp; Current job</label></div>
                            <div>
                                <button className='btn btn--success' type='submit'>Update</button>
                                <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                            </div>
                        </form>
                        :
                        <div className='workExp-container__content'>
                            <div className='line'/> 
                            <div className='workExp-container__form-header'>
                                <p>{exp.company}</p>
                                <div className='workExp-container__form-header-button'>
                                    <i className='fas fa-pencil-alt icon icon--link' onClick={e => { e.preventDefault(); handleOnEditWork(exp) }}></i> &nbsp;
                                    <i className='far fa-trash-alt icon icon--link' onClick={e => handleRemoveInformation(e, 'Work', exp._id)}></i>
                                </div>
                            </div>
                            <p>{exp.position}</p>
                            <p>{new Date(exp.startDate).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
                            {exp.current ? <div className='checkbox'><input type='checkbox' id='current' name='current' checked/><label for='current'>&nbsp; Current job</label></div> : <p>{new Date(exp.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' })}</p>}
                        </div>
                    }
                </div>
            })
            }
        </div>

    )
}