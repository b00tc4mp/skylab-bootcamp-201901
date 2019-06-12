import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import backgroundImg from '../../img/background-social.jpeg'

function Slider({ onSearchItems }) {

    function handleSearch(e) {
        e.preventDefault()
        const query = e.target.query.value
        onSearchItems(query)
    }


    return (

        <section className="slider" style={{ backgroundImage: `url("${backgroundImg}")`}} >
                <div>
                    <header className="slider__header">
                        <h1>La Clave</h1>
                        <p>Find the best congress in your city.</p>
                        <p>Life is better when you dancing</p>
                    </header>

                    <form onSubmit={handleSearch} className="slider__search" >
                        <FontAwesomeIcon icon={faSearch} className="slider__search-icon" />
                        <input name="query" placeholder="Search your congress" className="slider__search-input" autoCorrect={false} />
                        
                    </form>

                    <p>#artists #barcelona #congresses</p>
                    
                </div>
        </section>

    )

}

export default Slider