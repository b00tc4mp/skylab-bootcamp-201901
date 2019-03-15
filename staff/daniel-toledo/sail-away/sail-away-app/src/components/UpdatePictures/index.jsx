'use strict'

import React, { useState, useEffect } from 'react'
import { Route, withRouter, Link } from 'react-router-dom'

import logic from '../../logic';


function UpdatePictures({ getPictures}) {

    let [picture, setPicture] = useState(null)
    
    async function uploadPicture() {
        try{
            let user= await logic.updatePicture(picture)
            debugger
            getPictures(user.pictures)

        }catch(error){
            console.error(error)
        }
    }

    return (<main className="update-picture">
        <div >
            <input type='file' name='image' onChange={e => setPicture({ image: e.target.files[0] })}></input>
            <button onClick={uploadPicture}>Upload image</button>
            {/* <button onClick={cancelEditorAdd}>Cancel</button> */}
        </div>
    </main>)
}

export default withRouter(UpdatePictures)