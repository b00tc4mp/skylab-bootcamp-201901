import React, { useState, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'
import Feerdback from '../Feedback';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../../logic'
import Playground from './Playground'
import Manager from './Manager'
import './index.sass'


function Editor({ history, match }) {

    const [actual, setActual] = useState(null)
    const [Globalstyles, setGlobalstyles] = useState(null)
    const { params: { id } } = match

    const handleactual = (e) => {
        setActual(e)
    }

    const handleStyle = (styles) => {
        styles = `.basic { ${styles} }`
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
    }

    return (<>
        <section class="container   ">
            <div class="columns">
                <div class="column is-one-fifth">
                    <aside class="menu">
                        <p class="menu-label" onClick={() => console.log(id)}>
                            Editor
                        </p>

                    </aside>
                    <Manager styles={handleStyle} />
                </div>
                <div class="column">
                    <Playground clicked={handleactual} /> 
                </div>
            </div>
        </section>
    </>)
}


export default withRouter(Editor)


