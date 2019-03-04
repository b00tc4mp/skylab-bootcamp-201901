import React from 'react'
// import { Link } from 'react-router-dom'
import './index.css'
import LandingMain from './landing-main'
import LandingProducts from './landing-products'
import Footer from '../Footer'

function Landing(props) {
    return (
        <main>
            <section>
                <div>
                    <h1>CleanUp</h1>
                    {/* <Link to="/categories" className="btn btn-outline-secondary first-main-buttons">Click here to enter</Link> */}
                </div>
            </section>
            <LandingProducts onAddToCart={props.onAddToCart} />
            <LandingMain />
            <Footer />
        </main>
    )
}

export default Landing