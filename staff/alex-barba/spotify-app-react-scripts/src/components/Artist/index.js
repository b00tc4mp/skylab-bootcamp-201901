import React from 'react'

class Artist extends React.Component {

    handleArtist = (id) => {

        const{ props: {onArtist, feedback}} = this

        onArtist(id, feedback)
    }
    
    render() {  
        const {props: { artists }, handleArtist} = this
    
        return <section className="resultsArtist container margin-top">
        <div className="columns is-mobile is-multiline is-centered">

        {
        artists.map(({ id, name, images, popularity, genres }) => {
            const genre = genres[0] ? genres[0] : 'No genre defined'
            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            
            return <div key={id} onClick={() => handleArtist(id)} data-id={id} className="column cursor card is-one-third-widescreen is-two-fifths-tablet is-three-quarters-mobile has-text-centered">
                <div className="hover card-image">
                    <figure className="image is-centered">
                        <img src={image} />
                    </figure>
                </div>
                <div className="card-content is-centered">
                    <h4 className="title is-4">{name}</h4>
                    <h5 className="subtitle is-6">Popularity Index :#{popularity}</h5>
                </div>
                <div className="card-footer">
                    <p className="subtitle is-6">Genre: {genre}</p>
                </div>
            </div>
            })
        }
        </div> 
    </section>
    }
}

export default Artist;