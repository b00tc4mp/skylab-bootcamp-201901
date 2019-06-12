import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Carousel } from 'react-responsive-carousel'
import 'tippy.js/themes/light.css'
import tippy from 'tippy.js'
import logic from '../../../logic'
import Slide from './Slide'

import { faWindowMaximize } from "@fortawesome/free-regular-svg-icons";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

import 'react-responsive-carousel/lib/styles/carousel.css'

import './index.sass'

function Playground({ slideCounterSetter, refreshSlide, renderSlides, presentationId }) {
    const [slides, setSlides] = useState([])
    const [syncreate, setsyncCreate] = useState([])
    const [domlist, setDomlist] = useState([])
    const [actual, setactual] = useState(0)

    /*  const handleCreate = () => {
         const basic = <Element key={domlist.length} />
         setDomlist(domlist.concat(basic))
     } */

    useEffect(() => {
        slideCounterSetter(actual)
    }, [actual])


    const handleDeleteSlide = async () => {
        if (actual > 0) {
            setactual(actual - 1)
            await logic.deleteSlide(presentationId, renderSlides[actual]._id)
            refreshSlide()
        }
    }

    const handleCreateSlide = async () => {
        await logic.createSlide(presentationId, `.Slide-${slides.length}{\nbackground-color: white \n} `)
        refreshSlide()
    }
    //const basic = React.createElement('div', { key:this.state.domlist.length , className: 'basic', onClick:this.handleclick }, 'hola');
    /* useEffect(() => {
        const template = document.querySelector('.slideForm')
        tippy('.createSlide', {
            content: template,
            animation: 'fade',
            placement: 'bottom',
            theme: 'light',
            trigger: 'click',
            interactive: true,
        })
    }, []) */

    useEffect(() => {
        if (renderSlides && slides.length < renderSlides.length) {
            renderSlides.forEach((element) => {
                const dbsync = slides.concat(<Slide
                    presentationId={presentationId}
                    slideid={renderSlides[slides.length]._id}
                    slideClass={renderSlides[slides.length].class}
                    elements={renderSlides[slides.length].elements}
                    refreshSlide={refreshSlide}

                />)
                // const dbsync = slides.concat(<Slide slideClass={element.class} elements={renderSlides[slides.length].elements} />)
                /* const dbsync = slides.concat(
                    (<div className="my-slide primary complex">
                        <div className={"manager " + renderSlides[slides.length].class}>
                            {renderSlides[slides.length].class}
                        </div>
                    </div>)
                    ) */
                setSlides(dbsync)
            })
        }
    }, [slides])

    useEffect(() => {
        if (renderSlides) {
            setSlides([])
        }
    }, [renderSlides])

    return (<>
        <nav  role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="slide_options navbar-item" onClick={handleCreateSlide} >
                        <FontAwesomeIcon icon={faWindowMaximize} size="2x" color="#A6A6A6"/>
                    </a>
                    <a class="slide_options navbar-item" onClick={handleDeleteSlide} >
                        <FontAwesomeIcon icon={faWindowClose} size="2x" color="#A6A6A6" />
                    </a>
                </div>
            </div>
        </nav>
        <div class="container">
            <Carousel showThumbs={false}
                onChange={(index) => setactual(index)}
                selectedItem={actual}
                showStatus={false}
                /* useKeyboardArrows */
                className="presentation-mode"
            >
                {slides}
            </Carousel>
        </div>
        {/* <Carousel showThumbs={false}
        showStatus={false}
        useKeyboardArrows
        className="presentation-mode"
    >
        
        <div className="my-slide primary complex">
            <div className="manager">
                {domlist}
            </div>
        </div>
        <div className="my-slide secondary complex">
            <div className="manager">
                {domlist}
            </div>
        </div> 
        </Carousel> */}
        {/* <div className="manager">
            {domlist}
        </div> */}
        {/* <form class="slideForm breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={handleCreate} >
            <div class="field is-horizontal" >
                <div class="field-label is-normal">
                    <label class="label">Title</label>
                </div>
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
        </form> */}
    </>
    );

}

export default Playground;