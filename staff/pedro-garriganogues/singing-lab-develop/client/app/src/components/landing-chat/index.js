import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function LandingChat (){
        return (
                <div className="jumbotron">
                    <h1 className="display-4">Chat with our teachers!</h1>
                    <p className="lead">Use the firebase chat example from the Firebase workshop</p>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <Link to="/our-team"  className="btn btn-outline-secondary chat-now-button" role="button">Chat now</Link>
                </div>
        )
}

export default LandingChat