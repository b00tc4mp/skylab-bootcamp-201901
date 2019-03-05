import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.css'
import LandingMain from './landing-main'
// import LandingProducts from './landing-products'


function Landing(props) {

    const hideProducts = props.location.pathname.includes(['register'])



    return (
        <main>
            <section>
                <div>
                    <h1>CleanUp</h1>
                </div>
            </section>
            {!hideProducts && <LandingMain />}
            {/* <LandingProducts onAddToCart={props.onAddToCart} /> */}

        </main>
    )
}

export default withRouter(Landing)