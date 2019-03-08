import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

export default function Language({ onAddLanguage, onEditLanguage, onAddInformation, onRemoveInformation, onUpdateInformation, editLanguage, addLanguage, onCancel }) {

    const { userData } = useContext(AppContext)

    const { language } = userData

    const [_language, setLanguage] = useState('')
    const [_levelLanguage, setLevelLanguage] = useState('')

    const handleOnEditLanguage = id => {
        onEditLanguage(id)
    }

    const handleOnAddLanguage = () => {
        onAddLanguage()
    }

    const handleAddInformation = (e, type) => {
        e.preventDefault()
        onAddInformation(type, { language: _language, level: _levelLanguage })
    }

    const handleUpdateInformation = (e, type, id) => {
        e.preventDefault()
        onUpdateInformation(type, id, { language: _language, level: _levelLanguage })
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
                <button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
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
                            <button onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
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

    )
}