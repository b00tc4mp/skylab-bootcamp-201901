
class Track extends React.Component{
    render(){
        const{props:{track,onBackToTracks}} = this
        console.log(track)
        return <section>
            <h3>Track</h3>
            <button onClick={onBackToTracks}>Back to Tracks</button>
            <ul>
            <li key={track.id}><img src={track.album.images.length ? track.album.images[0].url : '/staff/tachi-fernandez/spotify-app-react/img/logo.png'}></img>{name}</li>
            <li><audio src={track.preview_url} controls ></audio></li>
            
            </ul>
        </section>
    }
}

