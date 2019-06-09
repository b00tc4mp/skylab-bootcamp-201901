import React, { useState, useEffect } from 'react'
import Element from './Element'
import { Carousel } from 'react-responsive-carousel'
import 'tippy.js/themes/light.css'
import tippy from 'tippy.js'

import 'react-responsive-carousel/lib/styles/carousel.css'

import './index.sass'

function Playground() {
    const [domlist, setDomlist] = useState([])
    const handleCreate = () => {
        //const basic = React.createElement('div', { key:this.state.domlist.length , className: 'basic', onClick:this.handleclick }, 'hola');
        const basic = <Element key={domlist.length} />
        setDomlist(domlist.concat(basic))
    }

    useEffect(() => {
        const template = document.querySelector('.slideForm')
        tippy('.createSlide', {
            content: template,
            animation: 'fade',
            placement: 'bottom',
            theme: 'light',
            trigger: 'click',
            interactive: true,
        })

    }, []);

    return (<>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <h1 class="navbar-item">
                    DEVSLIDES
                </h1>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" onClick={handleCreate}>
                        Element
                    </a>

                    <a class="createSlide navbar-item" >
                        Slide
                    </a>
                </div>
            </div>
        </nav>
        <Carousel showThumbs={false}
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
        </Carousel>
        {/* <div className="manager">
            {domlist}
        </div> */}
        <form class="slideForm breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={handleCreate} >
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
        </form>
    </>
    );

}

export default Playground;