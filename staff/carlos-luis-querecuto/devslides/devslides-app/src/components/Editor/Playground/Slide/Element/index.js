import React, { useState, useEffect } from 'react';
import tippy from 'tippy.js'
import 'tippy.js/themes/light.css'
import 'react-responsive-carousel/lib/styles/carousel.css'
import 'bulma-divider/dist/css/bulma-divider.min.css'

function Element({ elementId, elementClass, elementContent, deleteElement, updateElement }) {

    const handleUpdate = e => {
        e.preventDefault()
        const {
            content: { value: content }
        } = e.target
        updateElement(elementId, elementClass, content)
    }

    useEffect(() => {
        const popperClass = document.querySelector('#popperClass')
        const popperElementOptions = document.querySelector('#popperElementOptions')

        tippy('#Element', {
            content: popperElementOptions,
            placement: 'top',
            followCursor: 'initial',
            arrowType: 'round', // or 'sharp' (default)
            trigger: 'click',
            theme: 'light',
            interactive: true,
            animation: 'fade',
            arrow: true
        })
        tippy('#Element', {
            content: popperClass,
            placement: 'top',
            arrowType: 'round', // or 'sharp' (default)
            followCursor: true,
            theme: 'google',
            animation: 'fade',
            arrow: true,
            multiple: true
        })

    }, [])

    return <>
        <div id="popperElementOptions">
            <form class="breadcrumb is-centered" aria-label="breadcrumbs" onSubmit={e => handleUpdate(e)} >
                <div class="menu-label">
                    <div class="has-text-centered">
                        <p >CONTENT</p>
                    </div>
                    <textarea class="input" name="content" >
                        {elementContent}
                    </textarea>
                </div>
                <button class="button is-small is-fullwidth">
                    <div class="menu-label has-text-centered" >
                        <p >UPDATE</p>
                    </div>
                </button>
            </form>
            <div class="is-divider" data-content="OR"></div>
            <button class="button is-medium is-fullwidth" onClick={() => deleteElement(elementId)}>
                <div class="menu-label has-text-centered">
                    <p >DELETE</p>
                </div>
            </button>
        </div>
        <div id='popperClass' >
            {`.${elementClass}`}
        </div>
        <div id='Element' className={`${elementClass}`}>
            {elementContent}
        </div>
    </>;

}

export default Element;