import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import Card from './Card'
//import IntroLanding from './IntroLanding'
import './index.sass'


function PresentationCard({ presentations, deletepresentation, history }) {
    return <ul>
        {
            /* presentations.map(({ _id:id, title }) => {
                return <Card id={id}/>
            }) */
            presentations.map(({ _id:id, title }) => {
                return <li class="presentationcard" key={id} >
                    <div class="card">
                        <div class="card-image">
                                <img class="presentationcard_image" src="https://static.thenounproject.com/png/980579-200.png" alt={`Presentation ${title}`} />
                        </div>
                        <div class="card-body">
                            <button class="button is-primary" onClick={() => history.push(`/Editor/${id}`)} >Edit</button>
                            <button class="button is-primary" onClick={() => deletepresentation(id)} >delete</button>
                        </div>
                    </div>
                </li>
            })
        }
    </ul>

}
export default withRouter(PresentationCard)