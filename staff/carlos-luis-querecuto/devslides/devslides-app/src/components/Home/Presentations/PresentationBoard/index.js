import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import tippy from 'tippy.js'
import Card from './Card'
import 'tippy.js/themes/light.css'
//import IntroLanding from './IntroLanding'
import './index.sass'


function PresentationBoard({ presentations, deletepresentation, history }) {

    const handleDelete = id =>{
        debugger
        deletepresentation(id)
    }

    return <ul>
        {
            presentations && presentations.map(({ _id: id, title }) => {
                return <Card presentationId={id} presentationTitle={title} deletePresentation={handleDelete} />
            })
        }
    </ul>

}
export default withRouter(PresentationBoard)