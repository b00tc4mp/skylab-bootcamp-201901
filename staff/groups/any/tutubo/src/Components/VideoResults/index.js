import React, { Component } from 'react'
import logic from '../../logic'
import './index.sass'

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
            <div className="searchVideoList">
                {videos.map(({ id: { videoId }, snippet: { title, channelId, publishedAt, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                    return <div className="videoResults" key={videoId} onClick={() => onVideoSelected(videoId)} >
                        <div className="resultsThumbnail"> 
                            <img src={url} />
                        </div>
                        <div className="searchResultsText">
                            <h2 className="videoSearchTitle">{title.length > 50 ? title = `${title.substr(0, 50)}...`: title}</h2>
                            <p className="searchChannelTitle" channel-id={channelId} onClick={() => console.log(channelId)}>{channelTitle} · {publishedAt = publishedAt.substr(0, 10)}</p>
                            <p className="searchDes">{description = description.substr(0, 100)}...</p>
                        </div>
                    </div>
                })}
            </div>
        </section>
    }
}

export default VideoRasults