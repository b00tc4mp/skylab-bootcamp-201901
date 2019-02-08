import React, { Component } from 'react'
import logic from '../../logic'
import './index.sass'

class VideoFav extends Component {

    state = { videos: [] }

    componentDidMount() {

        const { props: { id } } = this
        logic.watchVideo(id)
            .then(({ items }) => {
                this.setState({ videos: items })
            })
    }

    onVideoSelected = id => {

        const { props: { selectVideo } } = this

        selectVideo(id)
    }



    render() {
        const { state: { videos }, onVideoSelected, props: { mode } } = this
        return <section className="videolist">
            {videos.map(({ id: videoId, snippet: { title, channelId, publishedAt, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                return <div className="videoResults" key={videoId} onClick={() => onVideoSelected(videoId)}>
                    <div className="resultsThumbnail">
                        <img src={url} />
                    </div>
                    <div className="searchResultsText">
                        <h2 className={`${mode ? 'fav__title-black' : 'fav__title-white'}`}>{title.length > 50 ? title = `${title.substr(0, 50)}...` : title}</h2>
                        <p className={`${mode ? 'fav__channel-black' : 'fav__channel-white'}`} channel-id={channelId}>{channelTitle} · {publishedAt = publishedAt.substr(0, 10)}</p>
                        <p className={`${mode ? 'fav__description-black' : 'fav__description-white'}`}>{description = description.substr(0, 100)}...</p>
                    </div>
                </div>
            })}
        </section>
    }
}

export default VideoFav