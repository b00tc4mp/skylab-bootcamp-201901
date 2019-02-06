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
        const { onVideoSelected, state: { videos }, props: {mode} } = this
        console.log(videos)
        return <section>
            <div class={`${mode ? 'randomVideoList randomVideoList-light' : 'randomVideoList randomVideoList-dark'}`}>
                {videos.map(({ id: videoId , snippet: { title, channelId, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                    return <div className={`${mode ? 'card randomCard randomCard-light' : 'card randomCard randomCard-dark'}`} key={videoId} onClick={() => onVideoSelected(videoId)} >
                        <div className="card-image">
                            <figure className="image">
                                <img src={url}/>
                            </figure>
                        </div>
                        <h2 className={`${mode ? 'randomTittle randomTittle-light' : 'randomTittle randomTittle-dark'}`}>{title}</h2>
                        <p className="randomChannel" channel-id={channelId} onClick={() => console.log(channelId)}>{channelTitle}</p>
                        <p className="randomDes">{description = description.substr(0, 75)}...</p>
                    </div>
                })}
            </div>
        </section>
    }
}

export default Home