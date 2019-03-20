'use strict'

import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import profileBoat from './profile-boat.png'
import profile from './profile.png'

import './index.sass'

function SlideShow({ pictures, isBoat }) {

    if (isBoat) pictures = pictures.length ? pictures : [profileBoat]
    else pictures = pictures.length ? pictures : [profile]
    let [slideIndex, setSlideIndex] = useState(0)

    function changeSlide(index) {
        if (slideIndex + index < 0) setSlideIndex(pictures.length - 1)
        else if (slideIndex + index > pictures.length - 1) setSlideIndex(0)
        else setSlideIndex(slideIndex + index)
    }

    return (
        <div className="slideshow-container">

            {
                pictures.map((picture, index) => {
                    if (index === slideIndex) {
                        return (<div className="fade" key={picture}>
                            <img src={picture} alt={picture} className='image' />
                            <div className="numbertext">{index + 1} / {pictures.length}</div>
                        </div>)
                    }
                    else return ('')
                })
            }

            <button className="prev" onClick={() => changeSlide(-1)}>&#10094;</button>
            <button className="next" onClick={() => changeSlide(1)}>&#10095;</button>
        </div>
    )
}

export default withRouter(SlideShow)