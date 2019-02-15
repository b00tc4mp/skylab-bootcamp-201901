import React, { Component } from 'react'
import logic from '../../logic';
import './index.sass'
import Feedback from '../Feedback'

class Home extends Component {

    state = { videos: [], feedback:'' }

    componentDidMount() {

        try {
            logic.popularResults()
            .then(videos => {
                this.setState({videos})
            })
            .catch(({message}) => {
                this.setState({feedback: message})
            })
        } catch({message}) {
            this.setState({feedback: message})
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
                this.setState({videos})
            })
            .catch(({message}) => {
                this.setState({feedback: message})
            })
        } catch({message}) {
            this.setState({feedback: message})
        }
    }

    render() {
        const { onVideoSelected, state: { videos, feedback }, props: { mode} } = this
        return <section>
            {feedback && <Feedback message = {feedback}/>}
            <div className={`${mode ? 'randomVideoList randomVideoList-light' : 'randomVideoList randomVideoList-dark'}`}>
                {videos.map(({ id: videoId , snippet: { title, channelId, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                    return <div className={`${mode ? 'card randomCard randomCard-light' : 'card randomCard randomCard-dark'}`} key={videoId} onClick={() => onVideoSelected(videoId)} >
                        <div className="card-image">
                            <figure className="image">
                                <img src={url}/>
                            </figure>
                        </div>
                        <h2 className={`${mode ? 'randomTittle randomTittle-light' : 'randomTittle randomTittle-dark'}`}>{title}</h2>
                        <p className="randomChannel" channel-id={channelId}>{channelTitle}</p>
                        <p className="randomDes">{description = description.substr(0, 75)}...</p>
                    </div>
                })}
            </div>
        </section>
    }
}

export default Home