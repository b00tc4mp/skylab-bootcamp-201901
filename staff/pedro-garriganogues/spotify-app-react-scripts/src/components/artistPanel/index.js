import React from 'react'
import logic from '../../logic/index'

class ArtistPanel extends React.Component {

	handleAlbums = artistId => {
		try {
			logic.retrieveAlbums(artistId, (error, albums) => {
				if (error) console.log(error.message);
				else {
					this.props.setAlbums(albums)

				}
			})
		} catch (error) {
			console.log(error.message)

		}

	}

	render() {
		console.log(this.props.artists)

		return <main className="App">
			<section className="container">
				<div className="row">
					{
						this.props.artists.map(artist => {
							return (

								<div key={artist.id} className="border border-black text-center col-md-4" onClick={() => this.handleAlbums(artist.id)}>
									{(artist.images[0]) && <img className="img-fluid max-height:100px" alt="404" src={artist.images[0].url} />}
									<div className="row d-flex justify-content-center">
										<label>Name:</label>
										<p>{artist.name}</p>
									</div>
									<div className="row d-flex justify-content-center">
										<label>Genre:</label>
										<p>{artist.genres[0]}{artist.genres[1]}</p>
									</div>
									<div className="row d-flex justify-content-center">
										<label>Popularity:</label>
										<p>{artist.popularity}</p>
									</div>
								</div>

							);
						})
					}
				</div>

			</section>
		</main >
	}

}

export default ArtistPanel
