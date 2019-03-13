import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function Technology({ onAddTech, onEditTech, onAddInformation, onRemoveInformation, onUpdateInformation, editTechnology, addTechnology, onCancel }) {

    const { userData } = useContext(AppContext)

    const { technology } = userData

    const [_tech, setTech] = useState('')
    const [_levelTech, setLevelTech] = useState('')

    const handleOnEditTech = id => {
        onEditTech(id)
    }

    const handleOnAddTech = () => {
        onAddTech()
    }

    const handleAddInformation = (e, type) => {
        e.preventDefault()
        onAddInformation(type, { tech: _tech, level: _levelTech })
    }

    const handleUpdateInformation = (e, type, id) => {
        e.preventDefault()
        onUpdateInformation(type, id, { tech: _tech, level: _levelTech })
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
                <h5 className='subtitle'>Technologies</h5>
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
                <div>
                    <button className='btn btn--success' type='submit'>Add</button>
                    <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                </div>
            </form>}
            {technology && technology.map(tech => {
                return <div  className='tech-container__form'>
                    {editTechnology === tech._id ?
                        <form onSubmit={e => handleUpdateInformation(e, 'Tech', tech._id)}>
                            <div className='line'/> 
                            <input type='text' name='technology' placeholder='Technology' onChange={e => setTech(e.target.value)} defaultValue={tech.tech} required></input>
                            <select className='dropdown-content' onChange={e => setLevelTech(e.target.value)} value={tech.level}>
                                <option>Choose a level</option>
                                <option value='Fundamental awareness'>Fundamental awareness</option>
                                <option value='Novice'>Novice</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Advance'>Advance</option>
                                <option value='Expert'>Expert</option>
                            </select>
                            <div>
                                <button className='btn btn--success' type='submit'>Update</button>
                                <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                            </div>
                        </form>
                        :
                        <div className='tech-container__content'>
                            <div className='line'/> 
                            <div className='tech-container__form-header'>
                                <p>{tech.tech}</p>
                                <div className='tech-container__form-header-button'>
                                    <i className='fas fa-pencil-alt icon icon--link' onClick={e => { e.preventDefault(); handleOnEditTech(tech._id) }}></i> &nbsp;
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