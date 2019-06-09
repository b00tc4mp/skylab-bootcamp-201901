import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import GoogleMaps from '../../components/Maps'

import './index.scss'

function Landing({ locate }) {

    console.log('landing locate', locate)

    return (
        <section className="landing">
            <section className="landing__content">
                <section className="main-section">
                    <Header />
                    <section className=" buttons">
                        <Link className="button" to="/login">Login</Link>
                        <span className="separator">Or</span>
                        <Link className="button" to="/register">Register</Link>
                    </section>
                </section>
            </section>
            {locate &&
                <section className="maps">
                    <GoogleMaps
                        defaultPos={locate}
                    />
                </section>
            }
        </section>
    )
}

export default Landing
