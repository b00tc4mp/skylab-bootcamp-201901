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
    const [actual, setactual] = useState(0)

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
                className="presentation-mode"
            >
                {slides}
            </Carousel>
        </div>
    </>
    );

}

export default Playground;