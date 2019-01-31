import React , {Component} from 'react'
import logo from '../../components/img/logo.png'




class Artist extends Component {

    onGoToAlbums = artistId => {
        const {props:{handleAlbums}} = this
        handleAlbums(artistId)
    }

    render() {
        const { props: { artist, onBackToSearch } } = this

        
        return <section>
            <h3>Artist</h3>
            
            <button onClick={onBackToSearch}>Back</button>
            <ul>
                {artist.map(({ id, name, images }) => {
                    return <li key={id}><img onClick={() => this.onGoToAlbums(id)} src={images.length ? images[0].url : logo}></img>{name}</li>
                })}
            </ul>
        </section>
    }

}

export default Artist
