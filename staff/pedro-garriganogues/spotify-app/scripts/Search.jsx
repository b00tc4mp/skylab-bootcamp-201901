spotifyApi.token = 'BQCEQPt3i_BYmVjuSjOm3jmpdMb3bIh8bkUpON0DjRjzuEt6movRGZVmd2OkOuciAbtXeGt0PNU8AY8FeI_OJwNcexFifidwO4SwBGkopUM4hS7vWJIlhPNAB28hKtJicI4mrD60hzJz2bduUY5NvJrKblRHisEAvg'

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





