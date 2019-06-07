import React, { useState, useEffect } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
//import IntroLanding from './IntroLanding'
import './index.sass'


function PresentationCard({ presentations, history }) {

    return <ul>
        {
            presentations.map(({ _id:id, title }) => {
                return <li class="presentationcard" key={id} onClick={() => history.push(`/Editor/${id}`)}>
                    <div class="card">
                        <div class="card-image">
                            
                                <img class="presentationcard_image" src="https://static.thenounproject.com/png/980579-200.png" alt={`Presentation ${title}`} />
                     
                        </div>
                        {/* <div class="card-content">
                            <div class="media">
                                <div class="media-content">
                                    <p class="title is-4">{title}</p>
                                    <p class="subtitle is-6">@JohnDoe</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </li>
            })
        }
    </ul>

}
export default withRouter(PresentationCard)