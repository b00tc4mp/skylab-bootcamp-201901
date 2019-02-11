import React from 'react';

class Track extends React.Component {

    handleBackToTracks = () => {
        const { props: {onToTracks} } = this

        onToTracks()
    }

    handleFavourite = (id, name) => {
        const {props: {onFavourite} } = this
    
        onFavourite(id, name)
    }

    render() {
        const {props: {track: {id, name, preview_url, uri, album: {images}}, resultFavourite, userFavourites },handleBackToTracks, handleFavourite }= this
        
        const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'

        var heart = resultFavourite ? <img className="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" />: <img className="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" />

        if (userFavourites) {
            heart = userFavourites.some(obj => obj.id === id) ? <img className="icon" src="https://image.flaticon.com/icons/svg/148/148836.svg" /> : <img className="icon" src="https://image.flaticon.com/icons/svg/149/149217.svg" />
        }
        
        return <section className="trackChosen container margin-top">
            <div className="level is-mobile">
                <h4 className="level-item">Track</h4>
                <div className="level-item">
                    <button onClick={handleBackToTracks}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i>&nbsp;&nbsp;Back to Tracks</button>
                </div>
            </div>
            <div className="columns is-centered">
                <div data-id={id} className="column has-text-centered">
                    <img className="sm-image"src={image} />
                </div>
                <div className="column has-text-centered">
                    <div className="content">
                        <h3 className="margin-top title is-3">{name}</h3>
                        <button className="button is-large is-white"onClick={() => handleFavourite(id, name)}>
                            {heart}
                        </button>
                        <p>
                        <audio className="margin-top"src={preview_url} autoPlay controls></audio>
                        </p>
                        <p>
                            <a href={uri} className="margin-top button is-link is-small is-rounded">Listen to full song on Spotify</a>
                        </p>
                    </div>
                </div>
            </div>  
        </section>
        }
}


export default Track;