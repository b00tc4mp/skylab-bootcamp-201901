import React, { useState, useEffect } from 'react';
import Element from './Element'
import './index.sass'
import 'react-responsive-carousel/lib/styles/carousel.css'
var ReactDOM = require('react-dom');
var Carousel = require('react-responsive-carousel').Carousel;

function Playground() {
    const [domlist, setDomlist] = useState([])
    const handleCreate = () => {
        //const basic = React.createElement('div', { key:this.state.domlist.length , className: 'basic', onClick:this.handleclick }, 'hola');
        const basic = <Element key={domlist.length} />
        setDomlist(domlist.concat(basic))
    }
    useEffect(() => {


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

                    <a class="navbar-item" >
                        Slides
                    </a>
                </div>
            </div>
        </nav>
        <Carousel showThumbs={false}
            showStatus={false}
            useKeyboardArrows
            className="presentation-mode"
        >
            <div className="my-slide secondary complex">
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

    </>
    );

}

export default Playground;