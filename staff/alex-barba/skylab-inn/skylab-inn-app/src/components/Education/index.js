import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

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
        <div className='education-container'>
            <div className='education-container__header'>
                <h5 className='subtitle'>Education</h5>
                <i className='fas fa-plus-circle icon icon--link' onClick={e => { e.preventDefault(); handleOnAddEducation() }}></i>
            </div>
            {addEducation && <form onSubmit={e => handleAddInformation(e, 'Education')}>
                <input type='text' name='education' placeholder='College' onChange={e => setCollege(e.target.value)} required></input>
                <input type='text' name='education' placeholder='Degree' onChange={e => setDegree(e.target.value)} required></input>
                <div>
                    <button className='btn btn--success' type='submit'>Add</button>
                    <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                </div>
            </form>}
            {education && education.map(edu => {
                return <div  className='education-container__form'>
                    {editEducation === edu._id ?
                        <form onSubmit={e => handleUpdateInformation(e, 'Education', edu._id)}>
                             <div className='line'/> 
                            <input type='text' name='education' placeholder='College' onChange={e => setCollege(e.target.value)} defaultValue={edu.college} required></input>
                            <input type='text' name='education' placeholder='Degree' onChange={e => setDegree(e.target.value)} defaultValue={edu.degree} required></input>
                            <div>
                                <button className='btn btn--success' type='submit'>Update</button>
                                <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                            </div>

                        </form>
                        :    
                        <div className='education-container__content'>
                            <div className='line'/> 
                            <div className='education-container__form-header'>
                                <p>{edu.college}</p>
                                <div className='education-container__form-header-button'>
                                    <i className='fas fa-pencil-alt icon icon--link' onClick={e => { e.preventDefault(); handleOnEditEducation(edu._id) }}></i> &nbsp;
                                    <i className='far fa-trash-alt icon icon--link' onClick={e => handleRemoveInformation(e, 'Language', edu._id)}></i> 
                                </div>
                            </div>    
                                <p>{edu.degree}</p>
                        </div>
                    }
                </div>
            })
            }
        </div>
    )
}