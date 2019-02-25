import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import LandingMain from './landing-main'
import LandingProducts from './landing-products'
import LandingChat from '../landing-chat'
import Footer from '../footer'

function Landing(props) {
        return (
            <main>
                <section>
                    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light first-main">
                        <div className="col-md-5 p-lg-5 mx-auto my-5 second-main">
                            <h1 className="display-4 font-weight-normal landing-main-title">Singing-Lab</h1>
                            <p className="lead font-weight-normal">A place to increase your singing skills from home</p>
                            <Link to="/categories" className="btn btn-outline-secondary first-main-buttons">Click here to enter</Link>
                        </div>
                    </div>
                </section>
                <LandingProducts onAddToCart={props.onAddToCart}/>
                <LandingMain />
                <LandingChat />
                <Footer/>
            </main>
        )
}

export default Landing