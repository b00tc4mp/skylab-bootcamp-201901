import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import tippy from 'tippy.js'
import 'tippy.js/themes/light.css'
//import IntroLanding from './IntroLanding'
import './index.sass'


function Card({ history, id, deletePresentation }) {
    
    useEffect(() => {

        const template = document.querySelector(`#presentation${id}`)

        tippy(`#presentationToggle${id}`, {
            content: template,
            animation: 'fade',
            placement: 'bottom',
            theme: 'light',
            interactive: true,
            followCursor: 'initial'
        })
    }, []);


    return (<>
        <div id={`presentation${id}`}>
            <div>
                <button class="button is-primary" onClick={() => history.push(`/Editor/${id}`)}>Editor</button>
            </div>
            <div>
                <button class="button is-primary" onClick={() => deletePresentation(id)}>Delete</button>
            </div>
        </div>
        <li class="presentationcard" id={`presentationToggle${id}`} key={id} >
            <div class="card">
                <div class="card-image">
                        <img class="presentationcard_image" src="https://static.thenounproject.com/png/980579-200.png"/>
                </div>
                {/* <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-4">{title}</p>
                            <p class="subtitle is-6">@JohnDoe</p>
                        </div>
                    </div>
                </div> */}
            </div>
        </li>
    </>
    
    )
}
export default withRouter(Card)