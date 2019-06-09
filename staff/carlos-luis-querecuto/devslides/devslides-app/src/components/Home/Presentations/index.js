import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
//import IntroLanding from './IntroLanding'
import PresentationCard from './PresentationCard';
import tippy from 'tippy.js'
import 'tippy.js/themes/light.css'
import './index.sass'

import logic from '../../../logic'

function Presentations() {

    const [cards, setCards] = useState(null)

    useEffect(() => {

        const template = document.querySelector('#presentationForm')

        tippy('#createPresentation', {
            content: template,
            animation: 'fade',
            placement: 'bottom',
            theme: 'light',
            trigger: 'click',
            interactive: true,
        })

        async function retrieve() {
            const presentations = await logic.retrievePresentations()
            console.log(presentations.length)
            setCards(presentations)
        }
        retrieve()
    }, []);


    const handleCreate = async (e) => {
        e.preventDefault()
        console.log(e.title)

        const {
            title: { value: title },
        } = e.target
        try {
            await logic.createPresentation(title)
            setCards(await logic.retrievePresentations())
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await logic.deletePresentation(id)
            setCards(await logic.retrievePresentations())
        }
        catch (error) {
            console.log(error)
        }
    }



    return (<section >
        <form id="presentationForm" class="breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={e => handleCreate(e)} >
            <div class="field is-horizontal" >
        
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" name="title" />
                        </p>
                    </div>
                </div>
                <div>
                    <button class="button is-primary">Create</button>
                </div>
            </div>
        </form>
        <nav class="level">
            <p class="level-item has-text-centered">
                <a id="createPresentation"  class="button is-primary">Create Presentation</a>
            </p>
        </nav>
        <div class="breadcrumb is-centered">
            <section class="container">
                {!cards ? <div></div> : cards.length > 0 ? <PresentationCard presentations={cards} deletepresentation={handleDelete} /> : "No presentations"}
            </section>
        </div>
    </section>)
}


export default withRouter(Presentations)