// spotifyApi.token = 'BQCnSDHCsm8GsQi_5Lc0XxKxjyDBHtSio2F-ss14hsU0XAf9KBdxQSjmcfc3qRWr7cwj7PcGVhMdsQNzPvdo3KnCAFO-511UHl77w6cK3aUOrOflnTB1d25RN5exwyTz9REo-Vj10eYn_NM'

// const searchPanel = new SearchPanel
// const artistsPanel = new ArtistsPanel

// const $root = $('#root')

// artistsPanel.hide()

// $root.append(searchPanel.$container)
// $root.append(artistsPanel.$container)

class App extends React.Component {
	state = { email: "", surname: "" }

	handleEmailInput = event => this.setState({ email: event.target.value })
	handlePasswordInput = event => this.setState({ password: event.target.value })

	searchPanel = query => {
		try {
			logic.searchArtists(query, function(error, artists) {
				if (error) searchPanel.error = error.message
				else {
					artistsPanel.artists = artists

					artistsPanel.show()
				}
			})
		} catch (err) {}
	}

	render() {
		const {
			state: { selectedLanguage, loginFeedback },
			handleLanguageSelected,
			handleLogin
		} = this

		const title = <h1>{i18n[selectedLanguage].title}</h1>

		return (
			<main className="app">
				<LanguageSelector
					selectedLanguage={selectedLanguage}
					languages={[en]}
					onLanguageSelected={handleLanguageSelected}
				/>
				{title}
				<Login
					title={i18n[selectedLanguage].loginTitle}
					onLogin={handleLogin}
					feedback={loginFeedback}
				/>
			</main>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("root"))
