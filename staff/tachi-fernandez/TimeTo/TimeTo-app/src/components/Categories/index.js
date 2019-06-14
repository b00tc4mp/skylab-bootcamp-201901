import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Categories extends Component {



    render(){
        return(
            <section >

                <div className="categories">
                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c92035ce7179a0e40897dc3`}>
                        <img className="categories-category-img" src="/photos/partyy.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Party</h2>
                    </Link>
                </div>
                
                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c9203fbe7179a0e40897e3c`}>
                        <img className="categories-category-img" src="/photos/foood.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Food</h2>
                    </Link>
                </div>

                <div className="categories-category" >
                    <Link className="categories-category-link" to={`/category/5c920432e7179a0e40897e50`}>
                        <img className="categories-category-img" src="/photos/see-match.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">See Matches</h2>
                   </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c92045ae7179a0e40897e6f`}>
                        <img className="categories-category-img" src="/photos/do-sport.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Do Sport</h2>
                    </Link>
                </div>
                
                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c920480e7179a0e40897e74`}>
                        <img className="categories-category-img" src="/photos/drink-something.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Drink Something</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c9204a7e7179a0e40897e80`}>
                        <img className="categories-category-img" src="/photos/trip1.jpeg" alt="Smiley face" />
                        <h2 className="categories-category-title">Trip</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c9204d3e7179a0e40897e93`}>
                        <img className="categories-category-img" src="/photos/study1.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Study</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c9204fce7179a0e40897eb1`}>
                        <img className="categories-category-img" src="/photos/cinema.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Cinema</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c920531e7179a0e40897ec5`}>
                        <img className="categories-category-img" src="/photos/dance.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Dance</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c92055be7179a0e40897eda`}>
                        <img className="categories-category-img" src="/photos/family.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title"> Family</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c92057de7179a0e40897ef1`}>
                        <img className="categories-category-img" src="/photos/photography.jpg" alt="Smiley face" />
                        <h2 className="categories-category-title">Photography</h2>
                    </Link>
                </div>

                <div className="categories-category">
                    <Link className="categories-category-link" to={`/category/5c920599e7179a0e40897f11`}>
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