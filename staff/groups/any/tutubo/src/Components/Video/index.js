import React, { Component } from 'react'
import logic from '../../logic'
import Comments from '../Comments'

class Video extends Component {

    state = { comments: {}, videoId: '', text: '', videoInfo: null }

    componentDidMount() {

        const { props: { videoId } } = this

        console.log(videoId)

        this.handleShowComments()
        this.handleVideoInfo(videoId)
    }

    handleComment = (videoId, text) => {
        try {
            videoId=this.props.videoId
            logic.commentVideo(videoId, text)
                .catch(() => console.log('bitch shut the fuck up'))
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleShowComments = videoId => {
        try {
            videoId = this.props.videoId
            // debugger
            logic.showComments(videoId)
                .then(allComments => {
                    this.setState(allComments)
                })
                .catch(() => console.log('bitch shut the fuck upeeee'))
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleVideoInfo = videoId => {
        try {
            //console.log('1')
            logic.watchVideo(videoId)
                .then(({items}) => {
                    const videoInfo = items[0]
                    //console.log('dnjdn')
                    // let videoInfo = {}
                    // videoInfo += items[0]
                    this.setState({videoInfo})
                    console.log(videoInfo)
                })
                .catch(/* set state of feedback message */)
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleLike = id => {

    }
    

    render() {
        const { props: {videoId}, handleComment, state: { videoInfo}, handleLike, handleDislike } = this

        return <section>
            <iframe title={videoId} src={`https://www.youtube.com/embed/${videoId}`} width="100%" height="800"></iframe>
            {videoInfo && 
                <div>
                    <h2>{videoInfo.snippet.tittle}</h2>
                    <button onClick={handleLike}><i class="far fa-thumbs-up"></i></button>
                    <button onClick={handleDislike}><i class="far fa-thumbs-down"></i></button>
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
            <Comments onComment={handleComment} text={this.setState.text} comments={this.state.allComments} />
        </section>
    }
}

export default Video