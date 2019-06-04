import React from 'react'
import GoogleMaps from '../../components/Maps'
import GoogleMarker from '../../components/Marker'

import './index.scss'

const Landing = () => {
    return (
        <section className="landing">
            <section className="landing__content container">
                <section className="main-section">
                    <header className="header container">
                        <div className="">
                            <h1 className="">Cinema And Go
                                <span className="subtitle">Find the closest cinema and go!</span>
                            </h1>
                            <hr />
                        </div>
                    </header>

                    <section className=" buttons">
                        <a className="button" href="">Login</a>
                        <span className="separator">Or</span>
                        <a className="button" href="">Register</a>
                    </section>
                </section>

                <section className="maps">
                    <GoogleMaps>
                        <GoogleMarker />
                    </GoogleMaps>

                    <div className="mapouter hidden">
                        <div className="gmap_canvas">
                            <iframe id="gmap_canvas" title="maps" src="https://maps.google.com/maps?q=barcelona&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" />
                        </div>
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Landing
