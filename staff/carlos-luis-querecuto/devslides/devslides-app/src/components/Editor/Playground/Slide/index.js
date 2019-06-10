import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'tippy.js/themes/light.css'
import tippy from 'tippy.js'
import logic from '../../../../logic'
import 'react-responsive-carousel/lib/styles/carousel.css'

import './index.sass'

function Slide({ presentationId, slideid, slideClass, elements }) {
    
    const  [slideElements, setslideElements]  = useState([])
    
    useEffect(() =>{
        const template = document.querySelector('#elementForm')

        tippy('#CreateElement', {
            content: template,
            animation: 'fade',
            placement: 'bottom',
            theme: 'light',
            trigger: 'click',
            interactive: true,
        })
    },[])

    useEffect(() => {
        if(slideElements.length<elements.length){
            const div = syncformatElement(elements[slideElements.length])
            setslideElements(slideElements.concat(div))
        }
    },[slideElements])
    
    const syncformatElement = (element) => {
        return <div className={`${element.type}`}>
            {element.content}
        </div>
    }

    const createElement = async (e) => {
        e.preventDefault()
        const {
            content: { value: content },
            classname: { value: classname },
            style: { value: style },
        } = e.target
        const element = await logic.createElement(presentationId, slideid, "color: white",classname, content)
        const div = syncformatElement(element)
        setslideElements(slideElements.concat(div))
    }

    return (<>
        <form id="elementForm" class="breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={e => createElement(e)} >
            <div class="field is-horizontal" >
                <div class="field-body">
                    <div class="field">
                        <p class="control">
                            <input class="input" name="content" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="input" name="classname" />
                        </p>
                    </div>
                    <div class="field">
                        <p class="control">
                            <input class="input" name="style" />
                        </p>
                    </div>
                </div>
                <div>
                    <button class="button is-primary">Create</button>
                </div>
            </div>
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