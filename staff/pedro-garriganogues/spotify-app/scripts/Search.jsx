spotifyApi.token = 'BQBQUk6WYvUvOReOYmnmtyhwKi-dE6mWqirx8BsDJo1JFy02hhS89kV3KVFBq08O8jDgrezE1d9wuJi4bwUL8BBr6wQGDWIDau0LOBzJylOAEvAuOIc3nlfREywIGMX-LiN5Xc3FY3oD1eeWNz1OqF7wiN64Jv2IzA'

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
			<footer class="page-footer border border-black" ></footer>

		</section>
	}
}





