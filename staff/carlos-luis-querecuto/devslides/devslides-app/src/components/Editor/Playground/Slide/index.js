import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'tippy.js/themes/light.css'
import Element from './Element'
import tippy from 'tippy.js'
import logic from '../../../../logic'
import 'react-responsive-carousel/lib/styles/carousel.css'

import './index.sass'

function Slide({ presentationId, slideid, slideClass, refreshSlide, elements, barCreateElement }) {

    const [slideElements, setslideElements] = useState([])

    useEffect(() => {
        const template = document.querySelector('#elementForm')

        tippy('#CreateElement', {
            content: template,
            animation: 'fade',
            placement: 'left',
            theme: 'light',
            arrow: true,
            trigger: 'click',
            interactive: true,
        })
    }, [])

    useEffect(() => {
        if (slideElements.length < elements.length) {
            const div = syncformatElement(elements[slideElements.length])
            setslideElements(slideElements.concat(div))
        }
    }, [slideElements])

    const syncformatElement = (element) => {
        console.log(element)
        return <Element 
            elementId={element._id} 
            elementClass={element.type} 
            elementContent={element.content} 
            deleteElement={deleteElement} 
            updateElement={updateElement} 
            />
        {/* <div className={`${element.type}`}>
            {element.content}
        </div> */}
    }

    const deleteElement = async (elementId) => {
        await logic.deleteElement(presentationId, slideid, elementId)
        refreshSlide()
    }

    const updateElement = async (elementId, elementClass, content) => {
        console.log(content)
        await logic.updateSlideElement(presentationId, slideid, elementId, elementClass, content)
        refreshSlide()
    }

    const createElement = async (e) => {
        e.preventDefault()
        const {
            content: { value: content },
            classname: { value: classname },
        } = e.target
        const element = await logic.createElement(presentationId, slideid, "color: black", classname, content)
        const div = syncformatElement(element)
        setslideElements(slideElements.concat(div))
    }

    return (<>
        <form id="elementForm" class="breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={e => createElement(e)} >
            <div class="menu-label">
                <div class="has-text-centered">
                    <p >CLASS</p>
                </div>
                <input class="input" name="classname" />
            </div>

            <div class="menu-label">
                <div class="has-text-centered">
                    <p >CONTENT</p>
                </div>
                <textarea class="input" name="content" />
            </div>
            <button class="button is-medium is-fullwidth">
                <div class="menu-label has-text-centered">
                    <p >CREATE</p>
                </div>
            </button>
        </form>
        <div className="my-slide primary complex">
            <div id="CreateElement" className={"manager " + slideClass} >
                {slideElements}
            </div>
        </div>
    </>
    );

}

export default Slide;