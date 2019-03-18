'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import logic from '../../logic'
// import './index.sass'

function UpdatePictures({ getPictures, boatId }) {

    let [pictures, setPictures] = useState([])


    async function handlePictures(event) {
        let newPictureBlob = event.target.files[0]
        let newPictures = [...pictures, newPictureBlob]
        setPictures(newPictures)
        getPictures(newPictures)
        try {
            let result = await logic.updatePicture(pictures, boatId)
            debugger
            getPictures(result.pictures)

        } catch (error) {
            console.error(error)
        }
    }

    return (<main className="update-picture">
        <input className="update-picture__button" type='file' name='image' onChange={handlePictures}></input>
        {/* <span className="update-picture__span">edit picture</span> */}
    </main>)
}

export default withRouter(UpdatePictures)