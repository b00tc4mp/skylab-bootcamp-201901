'use strict'

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import Feedback from '../Feedback'

import logic from '../../logic'
import './index.sass'

function UpdatePictures({ getPictures, boatId }) {

    const [pictures, setPictures] = useState([])
    const [feedback, setfeedback] = useState('')

    async function handlePictures(event) {
        const newPictureBlob = event.target.files[0]
        const newPictures = [...pictures, newPictureBlob]
        setPictures(newPictures)
        getPictures(newPictures)
        
        try {
            if (pictures instanceof Blob){
            const result = await logic.updatePicture(pictures, boatId)
            getPictures(result.pictures)}

        } catch (error) {
            setfeedback(error.message)
        }
    }

    return (<main className="update-picture">
        {feedback ? <Feedback message={feedback} /> : <div />}
        <span className="update-picture__span">edit picture</span>
        <input className="update-picture__input" type='file' name='image' onChange={handlePictures}></input>
    </main>)
}

export default withRouter(UpdatePictures)