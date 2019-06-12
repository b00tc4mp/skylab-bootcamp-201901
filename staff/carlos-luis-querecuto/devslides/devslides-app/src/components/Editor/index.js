import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import Feerdback from '../Feedback';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../../logic'
import Playground from './Playground'
import Manager from './Manager'
import './index.sass'


function Editor({ history, match }) {

    const [slidesEditor, setslidesEditor] = useState([])
    const [dbStyles, setdbStyles] = useState("")
    const [dbSlides, setdbSlides] = useState(null)
    const [slides, setSlides] = useState([])
    const [onChangeStyle, setonChangeStyle] = useState(false)
    const [slidesCounter, setSlidesCounter] = useState(0)
    const [actualStyle, setActualstyle] = useState(null)
    const { params: { id } } = match

    useEffect(() => {
        refreshSlides()
    }, []);

    const refreshSlides = () => {
        async function retrievePresentation() {
            const presentation = await logic.retrievePresentation(id)
            setdbSlides(presentation.slides)
        }
        retrievePresentation()
    }
    useEffect(() => {
        setonChangeStyle(false)
    }, [slidesCounter])

    async function updateSlide() {
        if(onChangeStyle){
            const res = await logic.updateSlideStyles(id, dbSlides[slidesCounter]._id, actualStyle)
            slidesEditor[slidesCounter]=actualStyle
            console.log(res)
            setonChangeStyle(false)
        }
    }

    useEffect(() => {
        if (dbSlides) {
            let stylesPerSlide = []
            let slidesStyle = ''
            const renderSlide = dbSlides.map((slide, index) => {
                const { _id, style, elements } = slide
                slidesStyle = `${style}\n\n`
                /* elements.forEach((element) => {
                    slidesStyle += `.${element.type}{ \n ${element.style} \n}\n\n`
                }) */
                stylesPerSlide.push(slidesStyle)
                return {
                    _id,
                    elements,
                    class: `Slide-${index}`
                }
            })
            setslidesEditor(stylesPerSlide)
            setdbStyles(slidesStyle)
            setActualstyle(slidesEditor[0])
            setSlides(renderSlide)
        }
    }, [dbSlides]);
    return (<>
        <section class="container">
            <div class="columns">
                <div class="column is-one-fifth">
                    <aside class="menu">
                        <div class="menu-label" onClick={() => console.log(id)}>
                            <nav class="level manager_menu">
                                <div class="level-item has-text-centered">
                                    <p >Editor</p>
                                </div>
                                <div class="level-item has-text-centered">
                                    {onChangeStyle?
                                        <button class="button is-small" onClick={() => updateSlide()}>
                                            <p>UPDATE</p>
                                        </button>
                                        :
                                        <button class="button is-small" disabled onClick={() => updateSlide()}>
                                            <p>UPDATE</p>
                                        </button>
                                    }
                                </div>
                            </nav>                           
                        </div>
                        <Manager dbStyles={slidesEditor[slidesCounter]} setActualSlideStyle={setActualstyle} setonChangeStyle={setonChangeStyle} />
                    </aside>
                </div>
                <div class="playground column is-four-fifths">
                    <Playground slideCounterSetter={setSlidesCounter} renderSlides={slides} presentationId={id} refreshSlide={refreshSlides} />
                </div>
            </div>
        </section>
    </>)
}


export default withRouter(Editor)


