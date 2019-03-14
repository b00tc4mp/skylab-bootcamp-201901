import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Categories extends Component {



    render(){
        return(
            <section >
                <Link to={`/category/5c7e95f564f6cfa555e483d6`}>
                    <h2>Party</h2>
                    <img src="/photos/partyy.jpg" alt="Smiley face" />
                </Link>
                
                <Link to={`/category/5c7e961964f6cfa555e483e8`}>
                    <h2>Food</h2>
                    <img src="/photos/foood.jpg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e965a64f6cfa555e483ff`}>
                    <h2>See Matches</h2>
                    <img src="/photos/see-match.jpg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e968364f6cfa555e4840b`}>
                    <h2>Do Sport</h2>
                    <img src="/photos/do-sport.jpg" alt="Smiley face" />
                </Link>
                
                <Link to={`/category/5c7e969e64f6cfa555e48419`}>
                    <h2>Drink Something</h2>
                    <img src="/photos/drink-something.jpg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e96b464f6cfa555e48420`}>
                    <h2>Trip</h2>
                    <img src="/photos/trip1.jpeg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e96c064f6cfa555e48426`}>
                    <h2>Study</h2>
                    <img src="/photos/study1.jpg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e96e064f6cfa555e48435`}>
                    <h2>Cinema</h2>
                    <img src="/photos/cinema.jpg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e96f164f6cfa555e4843b`}>
                    <h2>Dance</h2>
                    <img src="/photos/dance.jpg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e970264f6cfa555e48448`}>
                    <h2>Family</h2>
                    <img src="/photos/family.jpg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e971964f6cfa555e4844f`}>
                    <h2>Photography</h2>
                    <img src="/photos/photography.jpg" alt="Smiley face" />
                </Link>

                <Link to={`/category/5c7e972664f6cfa555e48454`}>
                    <h2>Video Games</h2>
                    <img src="/photos/video-games.jpg" alt="Smiley face" />
                </Link>




                
            </section>
        )
    }
}

export default Categories