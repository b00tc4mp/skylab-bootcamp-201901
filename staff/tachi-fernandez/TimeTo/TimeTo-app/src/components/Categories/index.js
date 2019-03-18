import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Categories extends Component {



    render(){
        return(
            <section >

                <div className="categories">
                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e95f564f6cfa555e483d6`}>
                        <img className="categories-category-img" src="/photos/partyy.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Party</h2>
                    </Link>
                </div>
                
                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e961964f6cfa555e483e8`}>
                        <img className="categories-category-img" src="/photos/foood.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Food</h2>
                    </Link>
                </div>

                <div className="categories-category" >
                    <Link className="categories-category-link" to={`/category/5c7e965a64f6cfa555e483ff`}>
                        <img className="categories-category-img" src="/photos/see-match.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">See Matches</h2>
                   </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e968364f6cfa555e4840b`}>
                        <img className="categories-category-img" src="/photos/do-sport.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Do Sport</h2>
                    </Link>
                </div>
                
                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e969e64f6cfa555e48419`}>
                        <img className="categories-category-img" src="/photos/drink-something.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Drink Something</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e96b464f6cfa555e48420`}>
                        <img className="categories-category-img" src="/photos/trip1.jpeg" alt="Smiley face" />
                        <h2 className="categories-category-title">Trip</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e96c064f6cfa555e48426`}>
                        <img className="categories-category-img" src="/photos/study1.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Study</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e96e064f6cfa555e48435`}>
                        <img className="categories-category-img" src="/photos/cinema.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Cinema</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e96f164f6cfa555e4843b`}>
                        <img className="categories-category-img" src="/photos/dance.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Dance</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e970264f6cfa555e48448`}>
                        <img className="categories-category-img" src="/photos/family.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title"> Family</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e971964f6cfa555e4844f`}>
                        <img className="categories-category-img" src="/photos/photography.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Photography</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c7e972664f6cfa555e48454`}>
                        <img className="categories-category-img" src="/photos/video-games.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Video Games</h2>
                    </Link>
                </div>

                </div>




                
            </section>
        )
    }
}

export default Categories