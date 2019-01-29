class App extends React.Component {

	state = { user: null, artists: null, albums: null }

	setUser = user => this.setState({ user })
	setArtists = artists => this.setState({ artists })
	setAlbums = albums => this.setState({ albums })

	state = { loginVisible: true, registerVisible: false }

	goToRegisterForm = () => {
		this.setState({ loginVisible: false })
		this.setState({ registerVisible: true })

	}



	render() {

		const { state: { albums, artists, loginVisible, registerVisible, user }, goToRegisterForm } = this
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
					{/* lo pasa todo abajo */}
					{artists && !albums && <ArtistPanel setAlbums={this.setAlbums} artists={artists} />}
					{albums && <AlbumPanel albums={albums} />}
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


		return <section>
			<h1> Spookify</h1>
			<form onSubmit={this.handleSubmit}>
				<label>Email:</label>
				<input type="email" name="email" placeholder="email" onChange={this.handleInputChange} />
				<label>Password:</label>
				<input type="password" name="password" placeholder="password" onChange={this.handleInputChange} />
				<button type="submit">Login</button>
			</form>


		</section>
	}
}








