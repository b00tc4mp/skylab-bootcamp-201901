import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

export default function WorkExperience({ onAddWork, onEditWork, onAddInformation, onRemoveInformation, onUpdateInformation, editWork, addWorkExperience, onCancel }) {

    const { userData } = useContext(AppContext)

    const { workExperience } = userData

    const [_company, setCompany] = useState('')
    const [_position, setPosition] = useState('')
    const [_startDate, setStartDate] = useState('')
    const [_endDate, setEndDate] = useState('')
    const [_current, setCurrent] = useState('')

    const handleOnEditWork = id => {
        onEditWork(id)
    }

    const handleOnAddWork = () => {
        onAddWork()
    }

    const handleAddInformation = (e, type) => {
        e.preventDefault()
        onAddInformation(type, { company: _company, position: _position, startDate: _startDate, endDate: _endDate, current: _current })
    }

    const handleUpdateInformation = (e, type, id) => {
        e.preventDefault()
        onUpdateInformation(type, id, { company: _company, position: _position, startDate: _startDate, endDate: _endDate, current: _current })
    }

    const handleRemoveInformation = (e, type, id) => {
        e.preventDefault()
        onRemoveInformation(type, id)
    }

    const handleOnCancelEditOrAdd = () => {
        onCancel()
    }

    return (
        <section>
            <a onClick={e => { e.preventDefault(); handleOnAddWork() }}>Add Work Experience</a>
            {addWorkExperience && <div><form onSubmit={e => handleAddInformation(e, 'Work')}><input type='text' name='company' placeholder='Company' onChange={e => setCompany(e.target.value)} required></input>
                <input type='text' name='position' placeholder='Position' onChange={e => setPosition(e.target.value)} required></input>
                <input type='date' name='startDate' placeholder='Start date' onChange={e => setStartDate(e.target.value)} defaultValue={new Date().toISOString().substr(0, 10)} required></input>
                {_current ? null : <input type='date' name='endDate' placeholder='End Date' onChange={e => setEndDate(e.target.value)} defaultValue={new Date().toISOString().substr(0, 10)} ></input>}
                <p>Current Job <input type='checkbox' name='current' onChange={e => setCurrent(e.target.checked)} ></input></p>
                <button type="submit">Add</button>
                <button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
            </form>
            </div>}
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
                            <button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
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

    )
}