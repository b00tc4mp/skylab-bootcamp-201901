import React, { Component } from 'react'
import logic from '../../logic'
import './index.sass'

class VideoFav extends Component {

    state = { videos: [] }

    componentDidMount() {

        const { props: { id } } = this
        logic.watchVideo(id)
            .then(({ items }) => {
                console.log(items)
                this.setState({ videos: items })
                console.log(this.state.videos)
            })
    }

    onVideoSelected = id => {

        const { props: { selectVideo } } = this

        selectVideo(id)
    }



    render() {
        const { state: { videos }, onVideoSelected } = this

        return <section className="videolist">
            {videos.map(({ id: videoId, snippet: { title, channelId, publishedAt, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                return <div className="videoResults" key={videoId} onClick={() => onVideoSelected(videoId)}>
                    <div className="resultsThumbnail">
                        <img src={url} />
                    </div>
                    <div className="searchResultsText">
                        <h2 className="fav__title">{title.length > 50 ? title = `${title.substr(0, 50)}...` : title}</h2>
                        <p className="fav__channel" channel-id={channelId} onClick={() => console.log(channelId)}>{channelTitle} · {publishedAt = publishedAt.substr(0, 10)}</p>
                        <p className="fav__description">{description = description.substr(0, 100)}...</p>
                    </div>
                </div>
            })}
        </section>
    }
}

export default VideoFav