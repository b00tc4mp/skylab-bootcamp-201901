import React, {Component} from 'react';

class Favourite extends Component {

    handleTrackChosen = id => {
        const{ props: {onTrack, feedback}} = this

        onTrack(id, feedback)
    }

    handleBackToSearch = () => {
        const { props: {onToSearch} } = this

        onToSearch()
    }

    render() {
        const {props: {userFavourites}, handleTrackChosen, handleBackToSearch} = this

        return <section className="tracksAlbum container margin-top">
        <div className="level is-mobile">
            <h4 className="level-item">Favourite Tracks</h4>
            <div className="level-item">
                <button onClick={handleBackToSearch}className="button is-dark is-small is-rounded"><i className="fas fa-chevron-circle-left"></i>&nbsp;&nbsp;Back to Search</button>
            </div>
        </div>
        <nav className="panel list-group track">

        {
        userFavourites.map(({id, title}) => {
            return <a onClick={() => handleTrackChosen(id)} data-id={id} className="panel-block">
            <span className="panel-icon">
                <i className="fas fa-music" aria-hidden="true"></i>
            </span>
            {title}
        </a>   
        })
        }
            </nav>
        </section>
    }
}

export default Favourite