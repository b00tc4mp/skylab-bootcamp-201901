spotifyApi.token = 'BQDO5RK0oF8VwTktCVAl8tJRxbgOTha4i65Tt72XAg90qPpegwz8bsL5qNYsGj1vdEeHLLhx58bh5dPyXtxZMPaI88hG3Mg_CqFL2aY9E-yTjAso2-30BtA1MKL-5hjseZINMbeCb7Qzgvme5cjxMBpYSNJem_18hg'

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





