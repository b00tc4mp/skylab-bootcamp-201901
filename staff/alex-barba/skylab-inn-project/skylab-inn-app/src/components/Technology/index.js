import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function Technology({ onAddTech, onEditTech, onAddInformation, onRemoveInformation, onUpdateInformation, editTechnology, addTechnology, onCancel }) {

    const { userData: { technology }, setShowModal, setModalType, setModalMessage } = useContext(AppContext)

    const [_tech, setTech] = useState('')
    const [_levelTech, setLevelTech] = useState('')

    const handleOnEditTech = tech => {
        onEditTech(tech._id)
        setLevelTech(tech.level)
    }

    const handleOnAddTech = () => {
        setLevelTech(null)
        onAddTech()
    }

    const handleAddInformation = (e, type) => {
        e.preventDefault()
        if (!_levelTech || _levelTech === 'Choose a level') {
            setShowModal(true)
            setModalType('error')
            return setModalMessage('Failed to add. Level must be selected')
        }
        onAddInformation(type, { tech: _tech, level: _levelTech })
        setLevelTech(null)
    }

    const handleUpdateInformation = (e, type, id) => {
        e.preventDefault()
        if (!_levelTech || _levelTech === 'Choose a level') {
            setShowModal(true)
            setModalType('error')
            return setModalMessage('Failed to update. Level must be selected')
        }
        onUpdateInformation(type, id, { tech: _tech, level: _levelTech })
        setLevelTech(null)
    }

    const handleRemoveInformation = (e, type, id) => {
        e.preventDefault()
        onRemoveInformation(type, id)
    }

    const handleOnCancelEditOrAdd = () => {
        onCancel()
    }

    return (
        <div className='tech-container'>
            <div className='tech-container__header'>
                <h5>Technologies</h5>
                <i className='fas fa-plus-circle icon icon--link' onClick={e => { e.preventDefault(); handleOnAddTech() }}></i>
            </div>
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
                <div className='tech-container__form-button'>
                    <button className='btn btn--success' type='submit'>Add</button>
                    <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                </div>
            </form>}
            {technology && technology.map(tech => {
                return <div className='tech-container__form'>
                    {editTechnology === tech._id ?
                        <form onSubmit={e => handleUpdateInformation(e, 'Tech', tech._id)}>
                            <div className='line' />
                            <input type='text' name='technology' placeholder='Technology' onChange={e => setTech(e.target.value)} defaultValue={tech.tech} required></input>
                            <select className='dropdown-content' onChange={e => setLevelTech(e.target.value)} defaultValue={tech.level}>
                                <option value='Choose a level'>Choose a level</option>
                                <option value='Fundamental awareness'>Fundamental awareness</option>
                                <option value='Novice'>Novice</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Advance'>Advance</option>
                                <option value='Expert'>Expert</option>
                            </select>
                            <div className='tech-container__form-button'>
                                <button className='btn btn--success' type='submit'>Update</button>
                                <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                            </div>
                        </form>
                        :
                        <div className='tech-container__content'>
                            <div className='line' />
                            <div className='tech-container__form-header'>
                                <p>{tech.tech}</p>
                                <div className='tech-container__form-header-button'>
                                    <i className='fas fa-pencil-alt icon icon--link' onClick={e => { e.preventDefault(); handleOnEditTech(tech) }}></i> &nbsp;
                                    <i className='far fa-trash-alt icon icon--link' onClick={e => handleRemoveInformation(e, 'Tech', tech._id)}></i>
                                </div>
                            </div>
                            <p>Level: {tech.level}</p>
                        </div>
                    }
                </div>
            })
            }
        </div>
    )
}