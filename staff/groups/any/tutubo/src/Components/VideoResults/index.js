import React, { Component } from 'react'
import logic from '../../logic'
import './index.sass'
import Feedback from '../Feedback'

class VideoRasults extends Component {

    state = { videos: [], feedback:'' }

    componentDidMount() {

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
                    this.setState({
                        videos: items
                    })
                    this.setState({feedback: ''})
                })
                .catch(({message}) => {
                    this.setState({feedback: message})
                    this.setState({videos: []})
                })
        } catch ({ message }) {
            this.setState({feedback: message})
        }
    }

    onVideoSelected = id => {

        const {props : { selectVideo }} = this

        selectVideo(id)
    }


    render() {

        const { onVideoSelected, state: { videos, feedback}, props: {mode} } = this

        return <section className="videolist">
            <div className="video__feedback">
            {feedback && <Feedback message = {feedback}/>}
            </div>
            <div className={`${mode ? `searchVideoList searchVideoList-light` : 'searchVideoList searchVideoList-dark'}`}>
                {videos.map(({ id: { videoId }, snippet: { title, channelId, publishedAt, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                    return <div className="videoResults" key={videoId} onClick={() => onVideoSelected(videoId)} >
                        <div className="resultsThumbnail"> 
                            <img src={url} />
                        </div>
                        <div className="searchResultsText">
                            <h2 className={`${mode ? 'videoSearchTitle videoSearchTitle-light' : 'videoSearchTitle-dark'}`}>{title.length > 50 ? title = `${title.substr(0, 50)}...`: title}</h2>
                            <p className={`${mode ? 'searchChannelTitle searchChannelTitle-light' : 'searchChannelTitle'}`} channel-id={channelId}>{channelTitle} · {publishedAt = publishedAt.substr(0, 10)}</p>
                            <p className={`${mode ? 'searchDes searchDes-light' : 'searchDes'}`}>{description = description.substr(0, 100)}...</p>
                        </div>
                    </div>
                })}
            </div>
        </section>
    }
}

export default VideoRasults