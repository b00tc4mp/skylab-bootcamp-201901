import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import PersonalInformation from '../PersonalInformation'
import WorkExperience from '../WorkExperience'
import Technology from '../Technology'
import Language from '../Language'
import Education from '../Education'
import Feedback from '../Feedback'

import './index.sass'

export default function Profile({ onUpdatePersonalInfo, onAddInformation, onUpdateInformation, onRemoveInformation, onUploadPhoto }) {

    const { feedback, userData, setFeedback } = useContext(AppContext)

    const { name, surname, image } = userData

    const [_image, setImage] = useState(null)
    const [editImage, setEditImage] = useState(null)

    const [editPersonal, setEditPersonal] = useState(null)

    const [addWorkExperience, setAddWorkExperience] = useState(null)
    const [editWork, setEditWork] = useState(null)

    const [addTechnology, setAddTechnology] = useState(null)
    const [editTechnology, setEditTechnology] = useState(null)

    const [addLanguage, setAddLanguage] = useState(null)
    const [editLanguage, setEditLanguage] = useState(null)

    const [addEducation, setAddEducation] = useState(null)
    const [editEducation, setEditEducation] = useState(null)

    const handleOnUploadPhoto = () => {
        debugger
        setEditImage(null)
        onUploadPhoto(_image)
    }

    const handleUpdatePersonalInfo = data => {
        setFeedback(null)
        setEditPersonal(null)
        onUpdatePersonalInfo(data)
    }

    const handleAddInformation = (type, data) => {
        setFeedback(null)

        switch (type) {
            case 'Work':
                setAddWorkExperience(null)
                onAddInformation(type, data)
                break;
            case 'Tech':
                setAddTechnology(null)
                onAddInformation(type, data)
                break;
            case 'Language':
                setAddLanguage(null)
                onAddInformation(type, data)
                break;
            case 'Education':
                setAddEducation(null)
                onAddInformation(type, data)
                break;
            default:
                setFeedback('Please try it again')
                break;
        }
    }

    const handleUpdateInformation = (type, id, data) => {
        setFeedback(null)

        switch (type) {
            case 'Work':
                setEditWork(null)
                onUpdateInformation(id, type, data)
                break;
            case 'Tech':
                setEditTechnology(null)
                onUpdateInformation(id, type, data)
                break;
            case 'Language':
                setEditLanguage(null)
                onUpdateInformation(id, type, data)
                break;
            case 'Education':
                setEditEducation(null)
                onUpdateInformation(id, type, data)
                break;
            default:
                setFeedback('Please try it again')
                break;
        }
    }

    const handleRemoveInformation = (type, id) => {
        setFeedback(null)

        switch (type) {
            case 'Work':
                onRemoveInformation(id, type)
                break;
            case 'Tech':
                onRemoveInformation(id, type)
                break;
            case 'Language':
                onRemoveInformation(id, type)
                break;
            case 'Education':
                onRemoveInformation(id, type)
                break;
            default:
                setFeedback('Please try it again')
                break;
        }   
    }

    const handleOnEditPersonalInfo = () => {
        if (!addWorkExperience && !editWork && !editPersonal && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditPersonal(true)
    }

    const handleOnAddWork = () => {
        if (!editPersonal && !editWork && !addTechnology && !addWorkExperience && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setAddWorkExperience(true)
    }

    const handleOnEditWork = id => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditWork(id)
    }

    const handleOnAddTech = () => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setAddTechnology(true)
    }

    const handleOnEditTech = id => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditTechnology(id)
    }

    const handleOnAddLanguage = () => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setAddLanguage(true)
    }

    const handleOnEditLanguage = id => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditLanguage(id)
    }

    const handleOnAddEducation = () => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setAddEducation(true)
    }

    const handleOnEditEducation = id => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditEducation(id)
    }

    const handleOnEditImage = () => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation && !editImage) setEditImage(true)
    }

    const handleOnCancelEditorAdd = () => {
        editPersonal && setEditPersonal(null)
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
                    {!editImage && <div className='profile-container__personalInformation-image'>
                        {image ? <img alt='Default' onClick={handleOnEditImage} src={`${image}`}></img> : <img alt='Uploaded'onClick={handleOnEditImage} src='https://www.lagersmit.com/wp-content/uploads/2014/09/default_avatar-2.gif'></img> }
                    </div>}
                    {editImage && <div className='profile-container__personalInformation-image--edit'><input className='input--small' type='file' name='image' onChange={e => setImage(e.target.files[0])}></input>
                    <button className='btn btn--success' onClick={e => {e.preventDefault(); handleOnUploadPhoto()}}>Upload image</button>
                    <button className='btn btn--danger' onClick={e => { e.preventDefault(); handleOnCancelEditorAdd() }}>Cancel</button></div>}
                </div>
                {feedback && <Feedback />}
                <div className='profile-container__contactInformation'>
                    <PersonalInformation onEditPersonalInfo={handleOnEditPersonalInfo} onUpdatePersonalInfo={handleUpdatePersonalInfo} editPersonal={editPersonal} onCancel={handleOnCancelEditorAdd} />
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