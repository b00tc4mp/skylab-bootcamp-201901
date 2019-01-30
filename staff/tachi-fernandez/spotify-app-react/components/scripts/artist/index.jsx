
class Artist extends React.Component {

    onGoToAlbums = artistId => {
        const {props:{handleAlbums}} = this
        handleAlbums(artistId)
    }

    render() {
        const { props: { artist } } = this

        
        return <section>
            <h3>Artist</h3>
            <button type="submit">Back</button>
            <ul>
                {artist.map(({ id, name, images }) => {
                    return <li key={id}><img onClick={() => this.onGoToAlbums(id)} src={images.length ? images[0].url : '/staff/tachi-fernandez/spotify-app-react/img/logo.png'}></img>{name}</li>
                })}
            </ul>
        </section>
    }

}