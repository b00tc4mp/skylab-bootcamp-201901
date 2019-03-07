import React from 'react'
import { withRouter } from 'react-router-dom'
import './index.css'
import LandingMain from './landing-main'
// import LandingProducts from './landing-products'


function Landing(props) {

    // caso individual negativo:

    // const hideProducts = props.location.pathname.includes(['register'])

    // caso multiple negativo:

    // const hideProducts = ['/register', '/login', '/profile', '/contact', '/about', '/products', '/cart', '/product/{item._id}'].includes(props.location.pathname)

    // caso singular positivo:

    const showProducts = ['/'].includes(props.location.pathname)


    return (
        <main>


            {showProducts && <h1 className="cleanUp">CleanUp</h1>}
            {showProducts && <LandingMain />}


        </main>
    )
}

export default withRouter(Landing)