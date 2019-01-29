class ArtistPanel extends React.Component {

	handleAlbums = artistId => {
		try {
			logic.retrieveAlbums(artistId, (error, albums) => {
				if (error) console.log(error.message);
				else {
					this.props.setAlbums(albums)
					console.log(albums)
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

								<div key={artist.id} className="border border-black text-center border-rounded col-md-4" onClick={() => this.handleAlbums(artist.id)}>
									{(artist.images[0]) && <img className="img-fluid" src={artist.images[0].url} />}
									<label>Name:</label>
									<p>{artist.name}</p>
									<label>Genre:</label>
									<p>{artist.genres[0]}{artist.genres[1]}</p>
									<label>Popularity:</label>
									<p>{artist.popularity}</p>
								</div>

							);
						})
					}
				</div>

			</section>
		</main >
	}

}
