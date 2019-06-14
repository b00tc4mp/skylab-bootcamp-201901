import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import ContactInformation from '../ContactInformation'
import WorkExperience from '../WorkExperience'
import Technology from '../Technology'
import Language from '../Language'
import Education from '../Education'
import Feedback from '../Feedback'
import ConfirmAlert from '../ConfirmAlert'

import './index.sass'

export default function Profile({ onUpdateContactInfo, onAddInformation, onUpdateInformation, onRemoveInformation, onUploadPhoto }) {

    const { feedback, userData: { name, surname, image } , setFeedback, setShowConfirmAlert } = useContext(AppContext)

    const [_image, setImage] = useState(null)
    const [editImage, setEditImage] = useState(null)

    const [editContact, setEditContact] = useState(null)

    const [addWorkExperience, setAddWorkExperience] = useState(null)
    const [editWork, setEditWork] = useState(null)

    const [addTechnology, setAddTechnology] = useState(null)
    const [editTechnology, setEditTechnology] = useState(null)

    const [addLanguage, setAddLanguage] = useState(null)
    const [editLanguage, setEditLanguage] = useState(null)

    const [addEducation, setAddEducation] = useState(null)
    const [editEducation, setEditEducation] = useState(null)

    const handleOnUploadPhoto = () => {
        setEditImage(null)
        onUploadPhoto(_image)
    }

    const handleUpdateContactInfo = data => {
        setFeedback(null)
        setEditContact(null)
        onUpdateContactInfo(data)
    }

    const handleAddInformation = (type, data) => {
        setFeedback(null)

        switch (type) {
            case 'Work':
                setAddWorkExperience(null)
                onAddInformation(type, data)
                break
            case 'Tech':
                setAddTechnology(null)
                onAddInformation(type, data)
                break
            case 'Language':
                setAddLanguage(null)
                onAddInformation(type, data)
                break
            case 'Education':
                setAddEducation(null)
                onAddInformation(type, data)
                break
            default:
                setFeedback('Please try it again')
                break
        }
    }

    const handleUpdateInformation = (type, id, data) => {
        setFeedback(null)

        switch (type) {
            case 'Work':
                setEditWork(null)
                onUpdateInformation(id, type, data)
                break
            case 'Tech':
                setEditTechnology(null)
                onUpdateInformation(id, type, data)
                break
            case 'Language':
                setEditLanguage(null)
                onUpdateInformation(id, type, data)
                break
            case 'Education':
                setEditEducation(null)
                onUpdateInformation(id, type, data)
                break
            default:
                setFeedback('Please try it again')
                break
        }
    }

    const handleRemoveInformation = (type, id) => {
        setFeedback(null)
        setShowConfirmAlert([true, type, id]) 
    }

    const handleOnAlertAnswer = (alertAnswer, type, id) => {
        if (alertAnswer === 'Yes') {
            switch (type) {
                case 'Work':
                    onRemoveInformation(id, type)
                    break
                case 'Tech':
                    onRemoveInformation(id, type)
                    break
                case 'Language':
                    onRemoveInformation(id, type)
                    break
                case 'Education':
                    onRemoveInformation(id, type)
                    break
                default:
                    setFeedback('Please try it again')
                    break
            }
        } else {
            handleOnCancelEditorAdd()
                } 
    }

    const handleOnEditContactInfo = () => {
        if (!addWorkExperience && !editWork && !editContact && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditContact(true)
    }

    const handleOnAddWork = () => {
        if (!editContact && !editWork && !addTechnology && !addWorkExperience && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setAddWorkExperience(true)
    }

    const handleOnEditWork = id => {
        if (!editContact && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditWork(id)
    }

    const handleOnAddTech = () => {
        if (!editContact && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setAddTechnology(true)
    }

    const handleOnEditTech = id => {
        if (!editContact && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditTechnology(id)
    }

    const handleOnAddLanguage = () => {
        if (!editContact && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setAddLanguage(true)
    }

    const handleOnEditLanguage = id => {
        if (!editContact && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditLanguage(id)
    }

    const handleOnAddEducation = () => {
        if (!editContact && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setAddEducation(true)
    }

    const handleOnEditEducation = id => {
        if (!editContact && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditEducation(id)
    }

    const handleOnEditImage = () => {
        if (!editContact && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditImage(true)
    }

    const handleOnCancelEditorAdd = () => {
        editContact && setEditContact(null)
        addWorkExperience && setAddWorkExperience(null)
        editWork && setEditWork(null)
        addTechnology && setAddTechnology(null)
        editTechnology && setEditTechnology(null)
        addLanguage && setAddLanguage(null)
        editLanguage && setEditLanguage(null)
        addEducation && setAddEducation(null)
        editEducation && setEditEducation(null)
        editImage && setEditImage(null)
    }

    return (
        <div className='profile'>
            <div className='profile-header'>
                <h2>This is your profile {name}, <br/> is it up to date?</h2>
            </div>
            <div className='profile-container'>
                <div className='profile-container__personalInformation'>
                    <div className='profile-container__personalInformation-name'>
                        <h4>{name}<br/>{surname}</h4>
                    </div>
                    {!editImage && <div className='profile-container__personalInformation-image pointer'>
                        {image ? <img alt='Default' onClick={handleOnEditImage} src={`${image}`}></img> : <img alt='Uploaded'onClick={handleOnEditImage} src='https://cdn3.iconfinder.com/data/icons/web-design-and-development-glyph-vol-1/64/web-development-glyph-05-512.png'></img> }
                    </div>}
                    {editImage && <div className='profile-container__personalInformation-image--edit'><input className='input--small' type='file' name='image' onChange={e => setImage(e.target.files[0])}></input>
                    <button className='btn btn--success' onClick={e => {e.preventDefault(); handleOnUploadPhoto()}}>Upload image</button>
                    <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditorAdd() }}>Cancel</button></div>}
                </div>
                {feedback && <Feedback />}
                <ConfirmAlert onAlertAnswer={handleOnAlertAnswer}/>
                <div className='profile-container__contactInformation'>
                    <ContactInformation onEditContactInfo={handleOnEditContactInfo} onUpdateContactInfo={handleUpdateContactInfo} editContact={editContact} onCancel={handleOnCancelEditorAdd} />
                </div>
                <div className='profile-container__workExperience'>
                    <WorkExperience onAddWork={handleOnAddWork} onAddInformation={handleAddInformation} onEditWork={handleOnEditWork} onRemoveInformation={handleRemoveInformation} onUpdateInformation={handleUpdateInformation} editWork={editWork} addWorkExperience={addWorkExperience} onCancel={handleOnCancelEditorAdd} />
                </div>
                <div className='profile-container__technology'>
                    <Technology onAddTech={handleOnAddTech} onAddInformation={handleAddInformation} onEditTech={handleOnEditTech} onRemoveInformation={handleRemoveInformation} onUpdateInformation={handleUpdateInformation} editTechnology={editTechnology} addTechnology={addTechnology} onCancel={handleOnCancelEditorAdd} />
                </div>
                <div className='profile-container__language'>
                    <Language onAddLanguage={handleOnAddLanguage} onAddInformation={handleAddInformation} onEditLanguage={handleOnEditLanguage} onRemoveInformation={handleRemoveInformation} onUpdateInformation={handleUpdateInformation} editLanguage={editLanguage} addLanguage={addLanguage} onCancel={handleOnCancelEditorAdd} />
                </div>
                <div className='profile-container__education'>
                    <Education onAddEducation={handleOnAddEducation} onAddInformation={handleAddInformation} onEditEducation={handleOnEditEducation} onRemoveInformation={handleRemoveInformation} onUpdateInformation={handleUpdateInformation} editEducation={editEducation} addEducation={addEducation} onCancel={handleOnCancelEditorAdd} />
                </div>
            </div>
        </div>
    )

}