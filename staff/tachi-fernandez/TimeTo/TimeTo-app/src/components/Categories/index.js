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
                <div>
                    <h2>See Match</h2>
                    <img src="/photos/see-match.jpg" alt="Smiley face" />
                </div>
                <div>
                    <h2>Do Sport</h2>
                    <img src="/photos/do-sport.jpg" alt="Smiley face" />
                </div>
                <div>
                    <h2>Drink Something</h2>
                    <img src="/photos/drink-something.jpg" alt="Smiley face" />
                </div>
            </section>
        )
    }
}

export default Categories