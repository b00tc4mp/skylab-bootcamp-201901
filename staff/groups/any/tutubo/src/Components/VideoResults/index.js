import React, { Component } from 'react'
import logic from '../../logic';

class VideoRasults extends Component {

    state = { videos: [] }

    componentDidMount() {
        console.log('monuterds')

        const { props: { query } } = this

        this.handleSearch(query)
    }

    componentWillReceiveProps(props) {

        const { query } = props

        this.handleSearch(query)
    }

    handleSearch = query => {
        try {
            logic.searchVideo(query)
                .then(({ items }) => {
                    console.log(items)
                    this.setState({
                        videos: items
                    })
                })
                .catch(({ message }) => console.log(message))
        } catch ({ message }) {
            console.log(message)
        }
    }

    onVideoSelected = id => {

        const {props : { selectVideo }} = this

        selectVideo(id)
    }


    render() {

        const { onVideoSelected, state: { videos } } = this

        return <section className="videolist">
            <div>
                {videos.map(({ id: { videoId }, snippet: { title, channelId, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                    return <div className="video" video-id={videoId} onClick={() => onVideoSelected(videoId)} >
                        <img src={url} />
                        <h2>{title}</h2>
                        <p channel-id={channelId} onClick={() => console.log(channelId)}>{channelTitle}</p>
                        <p>{description}</p>
                    </div>
                })}
            </div>
        </section>
    }
}

export default VideoRasults