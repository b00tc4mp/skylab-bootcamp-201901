import React, { useContext, useState } from 'react'
import { AppContext } from '../AppContext'
import PersonalInformation from '../PersonalInformation'
import WorkExperience from '../WorkExperience'
import Technology from '../Technology'
import Language from '../Language'
import Education from '../Education'
import Feedback from '../Feedback'

export default function Profile({ onUpdatePersonalInfo, onAddInformation, onUpdateInformation, onRemoveInformation }) {

    const { feedback, userData, setFeedback } = useContext(AppContext)

    const { name, surname } = userData

    const [editPersonal, setEditPersonal] = useState(null)

    const [addWorkExperience, setAddWorkExperience] = useState(null)
    const [editWork, setEditWork] = useState(null)

    const [addTechnology, setAddTechnology] = useState(null)
    const [editTechnology, setEditTechnology] = useState(null)

    const [addLanguage, setAddLanguage] = useState(null)
    const [editLanguage, setEditLanguage] = useState(null)

    const [addEducation, setAddEducation] = useState(null)
    const [editEducation, setEditEducation] = useState(null)


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
        }
    }

    const handleOnEditPersonalInfo = () => {
        if (!addWorkExperience && !editWork && !editPersonal && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setEditPersonal(true)
    }

    const handleOnAddWork = () => {
        if (!editPersonal && !editWork && !addTechnology && !addWorkExperience && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setAddWorkExperience(true)
    }

    const handleOnEditWork = id => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setEditWork(id)
    }

    const handleOnAddTech = () => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setAddTechnology(true)
    }

    const handleOnEditTech = id => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setEditTechnology(id)
    }

    const handleOnAddLanguage = () => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setAddLanguage(true)
    }

    const handleOnEditLanguage = id => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setEditLanguage(id)
    }

    const handleOnAddEducation = () => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setAddEducation(true)
    }

    const handleOnEditEducation = id => {
        if (!editPersonal && !addWorkExperience && !editWork && !addTechnology && !editTechnology && !addLanguage && !editLanguage && !addEducation && !editEducation) setEditEducation(id)
    }

    const handelOnCancelEditorAdd = () => {
        editPersonal && setEditPersonal(null)
        addWorkExperience && setAddWorkExperience(null)
        editWork && setEditWork(null)
        addTechnology && setAddTechnology(null)
        editTechnology && setEditTechnology(null)
        addLanguage && setAddLanguage(null)
        editLanguage && setEditLanguage(null)
        addEducation && setAddEducation(null)
        editEducation && setEditEducation(null)
    }

    return (
        <section>
            <h2>Hi {name} </h2>
            <p>Update your profile</p>
            <section>
                <section>
                    <h4>{name} {surname}</h4>
                </section>
                <section>
                    <h5>Personal Information</h5>
                    <PersonalInformation onEditPersonalInfo={handleOnEditPersonalInfo} onUpdatePersonalInfo={handleUpdatePersonalInfo} editPersonal={editPersonal} onCancel={handelOnCancelEditorAdd} />
                </section>
                <section>
                    <h5>Work Experience</h5>
                    <WorkExperience onAddWork={handleOnAddWork} onAddInformation={handleAddInformation} onEditWork={handleOnEditWork} onRemoveInformation={handleRemoveInformation} onUpdateInformation={handleUpdateInformation} editWork={editWork} addWorkExperience={addWorkExperience} onCancel={handelOnCancelEditorAdd} />
                </section>
                <section>
                    <h5>Technology</h5>
                    <Technology onAddTech={handleOnAddTech} onAddInformation={handleAddInformation} onEditTech={handleOnEditTech} onRemoveInformation={handleRemoveInformation} onUpdateInformation={handleUpdateInformation} editTechnology={editTechnology} addTechnology={addTechnology} onCancel={handelOnCancelEditorAdd} />
                </section>
                <section>
                    <h5>Language</h5>
                    <Language onAddLanguage={handleOnAddLanguage} onAddInformation={handleAddInformation} onEditLanguage={handleOnEditLanguage} onRemoveInformation={handleRemoveInformation} onUpdateInformation={handleUpdateInformation} editLanguage={editLanguage} addLanguage={addLanguage} onCancel={handelOnCancelEditorAdd} />
                </section>
                <section>
                    <h5>Education</h5>
                    <Education onAddEducation={handleOnAddEducation} onAddInformation={handleAddInformation} onEditEducation={handleOnEditEducation} onRemoveInformation={handleRemoveInformation} onUpdateInformation={handleUpdateInformation} editEducation={editEducation} addEducation={addEducation} onCancel={handelOnCancelEditorAdd} />
                </section>
                {feedback && <Feedback />}
            </section>
        </section>
    )

}