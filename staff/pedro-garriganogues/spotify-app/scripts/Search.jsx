spotifyApi.token = 'BQA10da4yhcoNu-wrQfMXEeOvCEQ5lZtyvanSYLp_Q2sMT-8pg2tWn0_H4iLyduufRLajFBl6oC8dSYQu9lg5D3Uuyl-K6oXGyNtt0M27BGotKWbFZKSd68wKMeDYwOVmpgKzCesaYpH961Mqem_uI0AxFpfEkte9A'

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
			<footer className="page-footer border border-black" ></footer>

		</section>
	}
}





