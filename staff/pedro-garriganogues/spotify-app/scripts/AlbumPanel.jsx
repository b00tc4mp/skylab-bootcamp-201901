class ArtistPanel extends React.Component {

	handleAlbums = artistId => {
		console.log(artistId)
	}
	render() {
		console.log(this.props.artists)

		return <main className="App">
			{
				this.props.artists.map(artist => {
					return (
						<div key={artist.id} className="border border-black text-center " onClick={() => this.handleAlbums(artist.id)}>
							{(artist.images[0]) && <img src={artist.images[0].url} />}
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
		</main>
	}

}
