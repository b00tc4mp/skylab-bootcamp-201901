import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import tippy from 'tippy.js'
import 'tippy.js/themes/light.css'
//import IntroLanding from './IntroLanding'
import './index.sass'


function Card({ history, presentationId, presentationTitle, deletePresentation }) {

    useEffect(() => {

        tippy(`#presentationToggle${presentationId}`, {
            content: `Title: ${presentationTitle}`,
            animation: 'fade',
            placement: 'bottom',
            theme: 'light',
            followCursor: true
        })
    }, []);

    return (<>
        <div class="columns level">
            <div class="column level-item" id={`presentation${presentationId}`}>
                <div class="has-text-centered">
                    <h3 >Presentation: {presentationTitle}</h3>
                </div>
                <button class="button is-small is-fullwidth" onClick={() => history.push(`/Editor/${presentationId}`)}>
                    <div class="menu-label has-text-centered">
                        <p >Editor</p>
                    </div>
                </button>
                <button class="button is-small is-fullwidth" onClick={() => deletePresentation(presentationId)}>
                    <div class="menu-label has-text-centered">
                        <p >Delete</p>
                    </div>
                </button>
            </div>
            <div class="column level-item presentationcard" id={`presentationToggle${presentationId}`} key={presentationId} >
                <img class="presentationcard_image" src="https://static.thenounproject.com/png/980579-200.png" />
            </div>
        </div>
    </>

    )
}
export default withRouter(Card)