import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
//import IntroLanding from './IntroLanding'
import logic from '../../../logic'
import './index.sass'
import PresentationCard from './PresentationCard';


function Presentations() {


    const [createToggle, setCreateToggle] = useState(false)
    const [cards, setCards] = useState(null)

    useEffect(() => {
        async function retrieve() {
            const presentations = await logic.retrievePresentations()
            console.log(presentations.length)
            setCards(presentations)
        }
        retrieve()
    }, []);


    const handleCreate = async (e) => {
        e.preventDefault()

        const {
            title: { value: title },
        } = e.target
        try {
            await logic.createPresentation(title)
            setCards(await logic.retrievePresentations())
            setCreateToggle(!createToggle)
        }
        catch (error) {
            console.log(error)
        }
    }



    return (<section >
        {createToggle ?
            <form class="breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={handleCreate} >
                <div class="field is-horizontal" onClick={e => { e.preventDefault(); setCreateToggle(false) }}>
                    <div class="field-label is-normal">
                        <label class="label">Title</label>
                    </div>
                    <div class="field-body">
                        <div class="field">
                            <p class="control" onClick={e => e.stopPropagation()}>
                                <input class="input" name="title" />
                            </p>
                        </div>
                    </div>
                    <div>
                        <button onClick={e => e.stopPropagation()} class="button is-primary">Create</button>
                    </div>
                </div>
            </form>
            :
            <a onClick={e => { e.preventDefault(); setCreateToggle(true) }} href="#">
                Create Presentation
        </a>}
        <div class="breadcrumb is-centered">
            <section class="container">
                {!cards ? <div></div> : cards.length > 0 ? <PresentationCard presentations={cards} /> : "No presentations"}
            </section>
        </div>
    </section>)
}


export default withRouter(Presentations)