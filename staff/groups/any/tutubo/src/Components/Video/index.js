import React, { Component } from 'react'
import logic from '../../logic'
import Comments from '../Comments'
import './index.sass'

class Video extends Component {

    state = { comments: [], videoId: '', text: '', buttonLike: '', buttonDislike: '', videoInfo: '', likeStatus: false }

    componentDidMount() {

        const { props: { videoId } } = this

        this.handleVideoInfo(videoId)
        this.handleShowLike()
        this.handleShowComments()
    }

    handleComment = (videoId, date) => {
        try {
            videoId = this.props.videoId
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
                    this.setState({ comments })
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
                .then(({ items }) => {
                    // const videoInfo = items[0]
                    this.setState({ videoInfo: items[0] })
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
        //debugger

        //this.handleShowLike()
    }

    handleShowLike = () => {
        try {
            const idNow = this.props.videoId
            logic.retrieveLikes()
            .then((items) => {
                console.log(items)
                    if (items.likes) {
                    //debugger
                    //const idNow = this.props.videoId
                        if(items.likes.includes(idNow)) this.setState({likeStatus: !this.state.likeStatus})
                        else this.setState({likeStatus: this.state.likeStatus})
                    }
                })
            .catch((Error) => console.log(Error))
                
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    render() {
        const { props: { videoId }, handleShowComments, handleComment, state: { videoInfo, likeStatus }, handleLike, handleDislike } = this

        return <section className="section__video">
            <iframe className="iframe" title={videoId} src={`https://www.youtube.com/embed/${videoId}`}></iframe>
            <div className="panel__container">
                {videoInfo &&
                    <div className="video__container">
                        <div className="title-likes">
                            <h2 className="iframe__title">{videoInfo.snippet.title}</h2>
                            <div className="likes">
                                <i className={`${likeStatus ? "far fa-thumbs-up like" : "far fa-thumbs-up"}`} onClick={handleLike}></i>
                            </div>
                        </div>
                        <div>
                            <div className="channel">
                                <figure className="channelImg image is-64x64">
                                    <img className="is-rounded" alt="channel logo" src={videoInfo.snippet.thumbnails.default.url}></img>
                                </figure>
                                    <div className="channel__info">
                                        <h3 className="channel__text">{videoInfo.snippet.channelTitle}</h3>
                                        <p className="channel__publish">Publish At: {videoInfo.snippet.publishedAt}</p>
                                    </div>
                            </div>
                                <p className="channel__description">{videoInfo.snippet.description}</p>
                            </div>
                        </div>
                        }
            <Comments onComment={handleComment} text={this.setState.text} comments={this.state.comments} id={videoId} updateComments={handleShowComments} />
                    </div>
        </section>
            }
        }
        
export default Video