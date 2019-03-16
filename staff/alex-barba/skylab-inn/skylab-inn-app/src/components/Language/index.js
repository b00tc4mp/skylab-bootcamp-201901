import React, { useState, useContext } from 'react'
import { AppContext } from '../AppContext'

import './index.sass'

export default function Lnguage({ onAddLanguage, onEditLanguage, onAddInformation, onRemoveInformation, onUpdateInformation, editLanguage, addLanguage, onCancel }) {

    const { userData:{ language }, setShowModal, setModalType, setModalMessage } = useContext(AppContext)

    const [_language, setLanguage] = useState('')
    const [_levelLanguage, setLevelLanguage] = useState('')

    const handleOnEditLanguage = lang => {
        onEditLanguage(lang._id)
        setLevelLanguage(lang.level)
    }

    const handleOnAddLanguage = () => {
        setLevelLanguage(null)
        onAddLanguage()
    }

    const handleAddInformation = (e, type) => {
        e.preventDefault()
        if (!_levelLanguage || _levelLanguage === 'Choose a level') {
            setShowModal(true)
            setModalType('error') 
            return setModalMessage('Failed to add. Level must be selected')
        }    
        onAddInformation(type, { language: _language, level: _levelLanguage })
        setLevelLanguage(null)
    }

    const handleUpdateInformation = (e, type, id) => {
        e.preventDefault()
        if (!_levelLanguage || _levelLanguage === 'Choose a level'){
            setShowModal(true)
            setModalType('error') 
            return setModalMessage('Failed to update. Level must be selected')
        }
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
        <div className='language-container'>
            <div className='language-container__header'>
                <h5 className='subtitle'>Languages</h5>
                <i className='fas fa-plus-circle icon icon--link' onClick={e => { e.preventDefault(); handleOnAddLanguage() }}></i>
            </div>
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
                <div>
                    <button className='btn btn--success' type='submit'>Add</button>
                    <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                </div>
            </form>}
            {language && language.map(lang => {
                return <div  className='language-container__form'>
                    {editLanguage === lang._id ?
                        <form onSubmit={e => handleUpdateInformation(e, 'Language', lang._id)}>
                             <div className='line'/> 
                            <input type='text' name='language' placeholder='Language' onChange={e => setLanguage(e.target.value)} defaultValue={lang.language} required></input>
                            <select className='dropdown-content' onChange={e => setLevelLanguage(e.target.value)} value={lang.level}>
                                <option value='Choose a level'>Choose a level</option>
                                <option value='Elementary proficiency'>Elementary proficiency</option>
                                <option value='Limited working proficiency'>Limited working proficiency</option>
                                <option value='Professional working proficiency'>Professional working proficiency</option>
                                <option value='Full professional proficiency'>Full professional proficiency</option>
                                <option value='Native or bilingual proficiency'>Native or bilingual proficiency</option>
                            </select>
                            <div>
                                <button className='btn btn--success' type='submit'>Update</button>
                                <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditOrAdd() }}>Cancel</button>
                            </div>
                        </form>
                        :
                        <div className='language-container__content'>
                            <div className='line'/> 
                            <div className='language-container__form-header'>
                                <p>{lang.language}</p>
                                <div className='language-container__form-header-button'>
                                    <i className='fas fa-pencil-alt icon icon--link' onClick={e => { e.preventDefault(); handleOnEditLanguage(lang) }}></i> &nbsp;
                                    <i className='far fa-trash-alt icon icon--link' onClick={e => handleRemoveInformation(e, 'Language', lang._id)}></i> 
                                </div>
                            </div>    
                                <p>Level: {lang.level}</p>
                        </div>
                    }
                </div>
            })
            }
        </div>
    )
}