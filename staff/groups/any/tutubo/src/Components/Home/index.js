import React, { Component } from 'react'
import logic from '../../logic';
import './index.sass'

class Home extends Component {

    state = { videos: [] }

    componentDidMount() {

        try {
            logic.popularResults()
            .then(videos => {
                console.log(videos)
                this.setState({videos})
            })
            .catch(console.log('nooooo'))
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
        this.handleRandomVideos()
    }

    onVideoSelected = id => {

        const {props : { selectVideo }} = this

        selectVideo(id)
    }

    handleRandomVideos = () => {
        try {
            logic.popularResults()
            .then(videos => {
                console.log(videos)
                this.setState({videos})
            })
            .catch(console.log('nooooo'))
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    render() {
        const { onVideoSelected, state: { videos } } = this
        console.log(videos)
        return <section>
            <div class="videolist">
                {videos.map(({ id: videoId , snippet: { title, channelId, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                    return <div className="video" key={videoId} onClick={() => onVideoSelected(videoId)} >
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

export default Home