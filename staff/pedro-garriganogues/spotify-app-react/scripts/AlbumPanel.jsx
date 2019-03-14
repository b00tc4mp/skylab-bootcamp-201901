
class AlbumPanel extends React.Component {

	handleSongs = albumId => {
		try {
			logic.retrieveSongs(albumId, (error, tracks) => {
				if (error) console.log(error.message);
				else {
					this.props.setTracks(tracks)

				}
			})
		} catch (error) {
			console.log(error.message)

		}

	}

	render() {

		console.log(this.props.albums)

		return <main className="App">
			<section className="container">
				<div className="row">
					{
						this.props.albums.map(album => {
							return (

								<div key={album.id} className="border border-black text-center border-rounded col-md-4" onClick={() => this.handleSongs(album.id)}>
									{(album.images[0]) && <img className="img-fluid" src={album.images[0].url} />}
								</div>

							);
						})
					}
				</div>

			</section>
		</main >
	}

}