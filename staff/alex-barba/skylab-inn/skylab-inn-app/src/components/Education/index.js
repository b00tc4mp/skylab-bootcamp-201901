import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

export default function Education({ onAddEducation, onEditEducation, onAddInformation, onRemoveInformation, onUpdateInformation, editEducation, addEducation, onCancel }) {

    const { userData } = useContext(AppContext)

    const { education } = userData

    const [_college, setCollege] = useState('')
    const [_degree, setDegree] = useState('')

    const handleOnEditEducation = id => {
        onEditEducation(id)
    }

    const handleOnAddEducation = () => {
        onAddEducation()
    }

    const handleAddInformation = (e, type) => {
        e.preventDefault()
        onAddInformation(type, { college: _college, degree: _degree })
    }

    const handleUpdateInformation = (e, type, id) => {
        e.preventDefault()
        onUpdateInformation(type, id, { college: _college, degree: _degree })
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
            <a onClick={e => { e.preventDefault(); handleOnAddEducation() }}>Add Education</a>
            {addEducation && <form onSubmit={e => handleAddInformation(e, 'Education')}>
                <input type='text' name='education' placeholder='College' onChange={e => setCollege(e.target.value)} required></input>
                <input type='text' name='education' placeholder='Degree' onChange={e => setDegree(e.target.value)} required></input>
                <button type="submit">Add</button>
                <button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
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
                            <button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
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

    )
}