import React, { useState, useContext } from 'react'
import './index.sass'
import Feerdback from '../Feedback';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import logic from '../../logic'


function Editor({ history, match }) {

    const { params: { id } } = match

    return (<>
        <section class="container   ">
            <div class="columns">
                <div class="column is-one-fifth">
                    <aside class="menu">
                        <p class="menu-label" onClick={() => console.log(id)}>
                            General
                        </p>
                    </aside>
                </div>
            </div>
        </section>
    </>)
}


export default withRouter(Editor)


