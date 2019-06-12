import React, { useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCode } from "@fortawesome/free-regular-svg-icons"
import WOW from 'wowjs'

//import IntroLanding from './IntroLanding'
import './index.sass'

function Landing() {

    useEffect(() => {
        new WOW.WOW().init();
    }, [])

    return (<>
        <section class="intro">
            <div class=" container">
                <div class="columns landing-slogan">
                    <div class="column landing-slogan wow fadeInLeft">
                        <p class="landing-slogan">
                            Presentations with CSS, presentations
                        </p>
                        <div class="level">
                            <div class="level.item">
                            <FontAwesomeIcon class="dev-icon" icon={faFileCode} color="brown" />

                            </div>
                            <div class="level.item">

                            <p class="landing-text">
                                for Developerrs!
                            </p>
                            </div>
                        </div>

                    </div>
                    <div class="column landing-slogan wow fadeInRight">
                        <Carousel showArrows={false} dynamicHeight={false} infiniteLoop autoPlay >
                            <img src="https://cdn-images-1.medium.com/max/1050/1*07Eda0j0Xf-3xCYi1ZllcQ.jpeg" />
                        </Carousel>
                        {/* <img class="landingslogan_logo" src="https://i.pinimg.com/236x/c9/11/dc/c911dc5bd32f96afe77f40b839d95367--the-square-brackets.jpg" /> */}
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}


export default Landing