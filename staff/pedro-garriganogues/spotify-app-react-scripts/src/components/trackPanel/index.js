import React from 'react'

class TrackPanel extends React.Component {


	render() {
		console.log(this.props.tracks)

		return <main className="App">


			<section className="container">
				<div className="row">


					{
						this.props.tracks.map(({ name, preview_url }) => {
							console.log(preview_url)
							return (

								<audio key={name} src={preview_url} className="border border-black text-center border-rounded col-md-4" controls>
								</audio>

							);
						})
					}
				</div>

			</section>
		</main >
	}

}

export default TrackPanel