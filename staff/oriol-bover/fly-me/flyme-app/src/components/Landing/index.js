import React from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

function Landing() {
    return (<section className="hero is-fullheight">
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-5-tablet is-4-desktop">
                        <figure class="image landing--image">
                            <img src="https://res.cloudinary.com/drohwwwof/image/upload/v1553157693/Logo_tot.png" />
                        </figure>
                        <p>Flyme is an application that allows the user to control a drone through the keyboard or also program a flight path to do it automatically.</p>
                        <p>Your system is designed to be very intuitive and can be used by everyone.</p>
                        <p>The application allows to learn the most basic notions on which the programming paradigms are based.</p>
                        <p>With Flyme you can enjoy from the youngest to the oldest.</p>
                        <div className="field has-text-centered landing--links">
                            <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>)
}

export default Landing