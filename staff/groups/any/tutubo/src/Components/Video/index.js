import React, { Component } from 'react'
import logic from '../../logic'
import Comments from '../Comments'
import './index.sass'

class Video extends Component {

    state = { comments: [], videoId: '', text: '', buttonLike: '', buttonDislike: '' }

    componentDidMount() {

        const { props: { videoId } } = this

        console.log(videoId)

        this.handleShowComments()
        this.handleVideoInfo(videoId)
    }

    handleComment = (videoId, date) => {
        try {
            debugger
            videoId=this.props.videoId
            logic.commentVideo(videoId, date)
                .catch(() => console.log('bitch shut the fuck up'))
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleShowComments = videoId => {
        try {
            videoId = this.props.videoId
            logic.showComments(videoId)
                .then(comments => {
                    this.setState({comments})
                    console.log(comments)
                })
                .catch(() => console.log('bitch shut the fuck upeeee'))
        } catch {
            this.setState(console.log('rer'))
        }
    }

    handleVideoInfo = videoId => {
        try {
            logic.watchVideo(videoId)
                .then(({items}) => {
                    const videoInfo = items[0]
                    this.setState({videoInfo})
                    console.log(videoInfo)
                })
                .catch(/* set state of feedback message */)
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleLike = event => {
        event.preventDefault()

        const { props: { onLike, videoId } } = this

        onLike(videoId)
    }

    render() {
        const { props: {videoId, like }, handleShowComments, handleComment, state: { videoInfo}, handleLike, handleDislike } = this

        return <section>
            <iframe title={videoId} src={`https://www.youtube.com/embed/${videoId}`} width="100%" height="800"></iframe>
            {videoInfo && 
                <div>
                    <h2>{videoInfo.snippet.tittle}</h2>
                    <button onClick={handleLike}><i className={`${like? "far fa-thumbs-up blue" : "far fa-thumbs-up"}`}></i></button>
                    <button onClick={handleDislike}><i className="far fa-thumbs-down"></i></button>
                    <div>
                        <div>
                            {/* <img alt="channel logo">ChannelIcon</img> */}
                            <div>
                                <h3>{videoInfo.snippet.channelTittle}</h3>
                                <p>published at</p>
                            </div>
                        </div>
                        <p>{videoInfo.snippet.description}</p>
                        <p>{videoInfo.snippet.tags}</p>
                    </div>
                </div>
            }
            <Comments onComment={handleComment} text={this.setState.text} comments={this.state.comments} id={videoId} updateComments={handleShowComments}/>
        </section>
    }
}

export default Video