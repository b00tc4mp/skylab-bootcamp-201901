import React, { Component } from 'react'
import logic from '../../logic'
import VideoFav from '../VideoFav'

class Favorites extends Component {

    state = { videosid: [] }

    componentDidMount() {

        logic.retrieveLikes()
            .then((items) => {
                if (items.likes) {
                    this.setState({ videosid: items.likes })
                }
            }
        )

    }

    render() {

        const { state: { videosid }, props: { mode } } = this

        return <section className="videolist">
            <div className={`${mode ? `searchVideoList searchVideoList-light` : 'searchVideoList searchVideoList-dark'}`}>
                {videosid.map(id => <VideoFav id={id} selectVideo={this.props.selectVideo} mode={mode} />)}
            </div>
        </section>
    }
}

export default Favorites