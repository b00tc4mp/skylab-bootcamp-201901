import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

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
        <section>
            <a onClick={e => { e.preventDefault(); handleOnAddTech() }}>Add Technology</a>
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
                <button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
            </form>}
            {technology && technology.map(tech => {
                return <div>
                    <a onClick={e => { e.preventDefault(); handleOnEditTech(tech._id) }}>Edit Tech</a>
                    <a onClick={e => handleRemoveInformation(e, 'Tech', tech._id)}>Remove Tech Skill</a>
                    {editTechnology === tech._id ?
                        <form onSubmit={e => handleUpdateInformation(e, 'Tech', tech._id)}>
                            <input type='text' name='technology' placeholder='Technology' onChange={e => setTech(e.target.value)} defaultValue={tech.tech} required></input>
                            <select className='dropdown-content' onChange={e => setLevelTech(e.target.value)} value={tech.level}>
                                <option>Choose a level</option>
                                <option value='Fundamental awareness'>Fundamental awareness</option>
                                <option value='Novice'>Novice</option>
                                <option value='Intermediate'>Intermediate</option>
                                <option value='Advance'>Advance</option>
                                <option value='Expert'>Expert</option>
                            </select>
                            <button type="submit">Update</button>
                            <button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
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

    )
}