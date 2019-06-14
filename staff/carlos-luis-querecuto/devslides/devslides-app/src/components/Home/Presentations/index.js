import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
//import IntroLanding from './IntroLanding'
import PresentationBoard from './PresentationBoard';
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
            const _cards = await logic.retrievePresentations()
            debugger
            setCards(_cards)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await logic.deletePresentation(id)
            const _cards = await logic.retrievePresentations()
            setCards(_cards)
        }
        catch (error) {
            console.log(error)
        }
    }



    return (<section >

        <form id="presentationForm" class="breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={e => handleCreate(e)} >
            <div class="menu-label">
                <div class="has-text-centered">
                    <p >title</p>
                </div>
                <input class="input" name="title" />
            </div>
            <button class="button is-medium is-fullwidth">
                <div class="menu-label has-text-centered" >
                    <p >CREATE</p>
                </div>
            </button>
        </form>
        <nav class="level">
            <button id="createPresentation" class="button is-medium is-fullwidth">
                <div class="menu-label has-text-centered">
                    <p >New Presentation</p>
                </div>
            </button>
        </nav>
        <div class="breadcrumb is-centered">
            <section class="container">
                {!cards ? <div></div> : (cards.length > 0 ? <PresentationBoard presentations={cards} deletepresentation={handleDelete} /> : "No presentations")}
            </section>
        </div>
    </section>)
}


export default withRouter(Presentations)