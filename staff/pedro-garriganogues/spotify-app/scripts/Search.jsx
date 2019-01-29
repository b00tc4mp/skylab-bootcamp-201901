spotifyApi.token = 'BQAMBZ4PQUrN3eNE0_zV9hpC68z8qZ6CGuzNqzZB8kTrX5egedwmvXHInfIkIN6mfSZIE6EFsLgf01XmSHGp0g4FqYS1v0_ebIE5NiC-cUXhIY-mt5XAk3MmmUbP_CwrBre84nifigqXgP8EI4AYr9DlXIbiepNPMg'

class Search extends React.Component {

	handleInputChange = event => this.setState({ [event.target.name]: event.target.value })

	state = { artist: null }

	handleSubmit = event => {
		event.preventDefault()
		try {
			logic.searchArtists(this.state.artist, (error, artists) => {
				if (error) console.log(error.message);
				else {
					this.props.setArtists(artists)
				}
			})
		} catch (error) {
			console.log(error.message)

		}
	}

	render() {

		return <section>
			<h1> Welcome to Spookify</h1>
			<form onSubmit={this.handleSubmit}>
				<label>Buscar Artista:</label>
				<input type="artist" name="artist" placeholder="artist" onChange={this.handleInputChange} />
				<button type="submit">Login</button>
			</form>


		</section>
	}
}





