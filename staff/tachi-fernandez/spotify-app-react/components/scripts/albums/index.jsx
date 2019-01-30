
class Albums extends React.Component {
    state = { albumId: '' }
    onGoToTracks = albumId => {
        const {props:{handleTracks}} = this
        handleTracks(albumId)
    }
    
    render() {
        const { props: { albums,onBackToArtist } } = this

        console.log(albums)
        return <section>
            <h3>Albums</h3>
            <button onClick={onBackToArtist}>Back to artist</button>
            <ul>
                {albums.map(({ id, name, images }) => {
                    return <li key={id}><img onClick={() => this.onGoToTracks(id)} src={images.length ? images[0].url : '/staff/tachi-fernandez/spotify-app-react/img/logo.png'}></img>{name}</li>

                })}
            </ul>
        </section>
    }


}