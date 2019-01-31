import React from 'react';

class Tracks extends React.Component {
    handleTrackChosen = id => {
        const{ props: {onTrack, feedback}} = this

        onTrack(id, feedback)
    }

    handleBackToAlbums = () => {
        const { props: {onToAlbums} } = this

        onToAlbums()
    }
    render() {
        const {props: {tracks}, handleTrackChosen, handleBackToAlbums} = this

        return <section className="tracksAlbum container margin-top">
        <div className="level is-mobile">
            <h4 className="level-item">Tracks</h4>
            <div className="level-item">
                <button onClick={handleBackToAlbums}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i>&nbsp;&nbsp;Back to Albums</button>
            </div>
        </div>
        <nav className="panel list-group track">

        {
        tracks.map(({id, name}) => {
            return <a onClick={() => handleTrackChosen(id)} data-id={id} className="panel-block">
            <span className="panel-icon">
                <i className="fas fa-music" aria-hidden="true"></i>
            </span>
            {name}
        </a>   
        })
        }
            </nav>
        </section>
    }
}

export default Tracks;