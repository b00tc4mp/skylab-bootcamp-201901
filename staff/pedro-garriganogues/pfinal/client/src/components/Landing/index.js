import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.css'
import LandingMain from './landing-main'
// import LandingProducts from './landing-products'


function Landing(props) {

    // caso individual:

    // const hideProducts = props.location.pathname.includes(['register'])

    // caso multiple:

    const hideProducts = ['/register', '/login', '/profile', '/contact', '/about', '/products'].includes(props.location.pathname)


    return (
        <main>

            <h4>
                {!hideProducts && <h1 className="cleanUp">CleanUp</h1>}
            </h4>
            {!hideProducts && <LandingMain />}
            {/* <LandingProducts onAddToCart={props.onAddToCart} /> */}

        </main>
    )
}

export default withRouter(Landing)