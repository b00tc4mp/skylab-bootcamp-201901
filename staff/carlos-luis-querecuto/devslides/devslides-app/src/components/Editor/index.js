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
    const [actualSlide, setActualSlide] = useState(0)
    const [slidesCounter, setSlidesCounter] = useState(0)
    const [Globalstyles, setGlobalstyles] = useState(null)
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
    useEffect(() =>{
        console.log(slidesCounter)
    },[slidesCounter])

    useEffect(() => {
        if (dbSlides) {
            let stylesPerSlide= []
            let slidesStyle = ''
            const renderSlide = dbSlides.map((slide,index) => {
                const { _id, style, elements } = slide
                slidesStyle = `.Slide-${index}{ \n ${style} \n}\n\n`
                elements.forEach((element) => {
                    slidesStyle += `.${element.type}{ \n ${element.style} \n}\n\n`
                })
                stylesPerSlide.push(slidesStyle)
                return {
                    _id,
                    elements,
                    class: `Slide-${index}`
                }
            })
            setslidesEditor(stylesPerSlide) 
            setdbStyles(slidesStyle)
       /*      handleStyle(slidesStyle) */
            setSlides(renderSlide)
        }
    }, [dbSlides]);


    /* const handleStyle = (styles) => {
        if (Globalstyles) {
            let style = document.createElement('style');
            style.type = "text/css"

            style.innerHTML = styles
            const ref = document.querySelector('.manager');
            ref.parentNode.insertBefore(style, ref);
        } else {
            var style = document.querySelector('style');
            style.innerHTML = styles
        }
        setGlobalstyles(styles)
    } */

    return (<>
        <section class="container   ">
            <div class="columns">
                <div class="column is-one-fifth">
                    <aside class="menu">
                        <p class="menu-label" onClick={() => console.log(id)}>
                            Editor
                        </p>

                    </aside>
                    <Manager dbStyles={slidesEditor[slidesCounter]}/>
                </div>
                <div class="column is-four-fifths">
                    <Playground slideCounterSetter={setSlidesCounter} renderSlides={slides} presentationId={id} refreshSlide={refreshSlides} />
                </div>
            </div>
        </section>
    </>)
}


export default withRouter(Editor)


