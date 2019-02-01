import React from 'react'

class NavResults extends React.Component {

    state = { albumVisual: true, artistVisual: false, trackVisual: false }

    handleArtistButton = event => {
        event.preventDefault()

        this.props.artistButton()
    }

    handleAlbumButton = event => {
        event.preventDefault()

        this.props.albumButton()
    }

    render() {
        return <nav className="navbar navbar-expand navbar-light">

            <ul className="navbar-nav mr-auto">

                {<li className="nav-item active" id="artist">
                    <a onClick={this.handleArtistButton} className="nav-link ml-3" href="#">Artists</a>
                </li>}

                {this.props.albumButtonVisual && <li className="nav-item active" id="album">
                    <a onClick={this.handleAlbumButton} className="nav-link ml-3" href="#"> Albums</a>
                </li>}

                {this.props.trackButtonVisual && <li className="nav-item active" id="tracks">
                    <a className="nav-link ml-3" href="#">Tracks</a>
                </li>}
            </ul>

        </nav>
    }
}

export default NavResults