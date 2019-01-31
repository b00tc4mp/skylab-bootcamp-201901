spotifyApi.token = 'BQBONhxyz1nx52roDV78XJylksoa8EtblKXvMBnw2tbY9zLmqM6yVpcS1RpTsg46x0klRGAjMLUT9cwWLdKYx4YsIwyi-2ikCaOoh3VJj-h-jKZWEKzzZYiK93e2TysjqhCF1fL7q5ghXDuEDhqXkr1bsaNWuIOmbg'

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
			<form onSubmit={this.handleSubmit}>
				<input type="artist" name="artist" placeholder="artist" onChange={this.handleInputChange} />
				<button type="submit btn">Login</button>
			</form>
			<footer className="page-footer" ></footer>

		</section>
	}
}





