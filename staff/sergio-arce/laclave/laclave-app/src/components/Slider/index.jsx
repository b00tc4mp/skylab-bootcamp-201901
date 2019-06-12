import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import video from '../../img/video.mp4'

function Slider({ onSearchItems }) {

    function handleSearch(e) {
        e.preventDefault()
        const query = e.target.query.value
        onSearchItems(query)
    }


    return (

        <section className="slider">
            {/* <video id="slider__video" loop autoPlay muted > */}
                    {/* <source src="" type="video/mp4" />
                    <source src={video} type="video/ogg" /> */}
                <div>
                    
                    <header className="slider__header">
                        <h1>La Clave</h1>
                        <p>Beautiful, free photos.</p>
                        <p>Gifted by the world’s most generous community of photographers.</p>
                    </header>

                    <form onSubmit={handleSearch} className="slider__search" >
                        <FontAwesomeIcon icon={faSearch} className="slider__search-icon" />
                        <input name="query" placeholder="Search your congress" className="slider__search-input" autoCorrect={false} />
                        
                    </form>

                    <p>Trending searches: flower, wall, paper, background, sad, love</p>
                    
                </div>
            {/* </video> */}
        </section>

    )

}

export default Slider