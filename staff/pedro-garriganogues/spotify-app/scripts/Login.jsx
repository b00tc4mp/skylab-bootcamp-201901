class App extends React.Component {

	state = { user: null, artists: null, albums: null, tracks: [] }

	setUser = user => this.setState({ user })
	setArtists = artists => this.setState({ artists })
	setAlbums = albums => this.setState({ albums })
	setTracks = tracks => this.setState({ tracks })

	state = { loginVisible: true, registerVisible: false }

	goToRegisterForm = () => {
		this.setState({ loginVisible: false })
		this.setState({ registerVisible: true })

	}



	render() {

		const { state: { tracks, albums, artists, loginVisible, registerVisible, user }, goToRegisterForm } = this
		return <main className="App">
			{!user &&
				<div>
					{loginVisible && <Login className="Login" setUser={this.setUser} />}
					{loginVisible && <ButtonRegister onRegister={goToRegisterForm} />}
					{registerVisible && <RegisterSection />}
				</div>
			}

			{user &&
				<div>
					<Search setArtists={this.setArtists} />
					{/* los elementos (class App. class Search, etc) se pasan propiedades entre ellos en la sección de abajo */}
					{artists && !albums && <ArtistPanel setAlbums={this.setAlbums} artists={artists} />}
					{albums && !tracks && <AlbumPanel albums={albums} setTracks={this.setTracks} />}
					{tracks && <TrackPanel tracks={tracks} />}
				</div>
			}



		</main>
	}

}




class Login extends React.Component {
	state = { email: '', password: '' }

	handleInputChange = event => this.setState({ [event.target.name]: event.target.value })

	handleSubmit = event => {
		event.preventDefault()
		try {
			logic.login(this.state.email, this.state.password, (user) => {
				this.props.setUser(user)
			})
		} catch (error) {
			console.log(error.message)
		}
	}


	render() {


		return <section className="d-flex justify-content-center">
			<form onSubmit={this.handleSubmit} className="border-rounded col-md-1">
				<label>Email:</label>
				<input type="email" name="email" placeholder="email" onChange={this.handleInputChange} />
				<label>Password:</label>
				<input type="password" name="password" placeholder="password" onChange={this.handleInputChange} />
				<button type="submit" className="btn m-1">Login</button>
			</form>


		</section>
	}
}








