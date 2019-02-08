import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Comments from '../Comments'
import './index.sass'
import Feedback from '../Feedback'

class Video extends Component {

    state = { comments: [], videoId: '', text: '', buttonLike: '', buttonDislike: '', videoInfo: '', likeStatus: false, feedback:'' }

    componentDidMount() {

        const { props: { videoId } } = this

        this.handleVideoInfo(videoId)
        this.handleShowLike()
        this.handleShowComments()
    }

    handleComment = (date) => {
        try {
            const { props: { videoId } } = this
            logic.commentVideo(videoId, date)
                .then(() => logic.showComments(videoId))
                .then(comments => {
                    this.setState({ comments })
                })
                .catch(({ message }) => {
                    this.setState({feedback: message})
                })
        } catch ({ message }) {
            this.setState({feedback: message})
        }
    }

    handleShowComments = videoId => {
        try {
            videoId = this.props.videoId
            logic.showComments(videoId)
                .then(comments => {
                    this.setState({ comments })
                })
                .catch(({ message }) => {
                    this.setState({feedback: message})
                })
        } catch ({ message }) {
            this.setState({feedback: message})
        }
    }

    componentWillReceiveProps(nextprops) {
        nextprops.like && this.setState({ likeStatus: nextprops.like.includes(this.props.videoId) })
    }

    handleVideoInfo = videoId => {
        try {
            logic.watchVideo(videoId)
                .then(({ items }) => {
                    this.setState({ videoInfo: items[0] })
                })
                .catch(({ message }) => {
                    this.setState({feedback: message})
                })
        } catch ({ message }) {
            this.setState({feedback: message})
        }
    }

    handleLike = event => {
        event.preventDefault()

        if (logic.userLoggedIn) {

            const { props: { onLike, videoId } } = this

            onLike(videoId)

        } else {
            this.props.history.push('/login')
        }
    }

    handleShowLike = () => {
        try {
            const { props: { videoId } } = this
            logic.retrieveLikes()
                .then((items) => {
                    if (items.likes) {
                        if (items.likes.includes(videoId)) this.setState({ likeStatus: !this.state.likeStatus })
                        else this.setState({ likeStatus: this.state.likeStatus })
                    }
                })
                .catch(({ message }) => {
                    this.setState({feedback: message})
                })

        } catch ({ message }) {
            this.setState({feedback: message})
        }
    }

    handleOnDelete = date => {
        const { props: { videoId } } = this
        logic.deleteComments(videoId, date)
            .then(() => logic.showComments(videoId))
            .then(comments => {
                this.setState({ comments })
            })
    }

    render() {
        const { props: { videoId }, handleShowComments, handleComment, state: { videoInfo, likeStatus, feedback }, handleLike, handleOnDelete } = this

        return <section className="section__video">
            <iframe className="iframe" title={videoId} src={`https://www.youtube.com/embed/${videoId}`}></iframe>
            <div className="panel__container">
                {videoInfo &&
                    <div className="video__container">
                        <div className="title-likes">
                            <h2 className="iframe__title">{videoInfo.snippet.title}</h2>
                            <i className={`${likeStatus ? "far fa-thumbs-up like" : "far fa-thumbs-up"}`} onClick={handleLike}></i>
                        </div>
                        <div>
                            <div className="channel">
                                <figure className="channelImg image is-64x64">
                                    <img className="is-rounded" alt="channel logo" src={videoInfo.snippet.thumbnails.default.url}></img>
                                </figure>
                                <div className="channel__info">
                                    <h3 className="channel__text">{videoInfo.snippet.channelTitle}</h3>
                                    <p className="channel__publish">Publish At: {videoInfo.snippet.publishedAt.substr(1, 9)}</p>
                                </div>
                            </div>
                            <p className="channel__description">{videoInfo.snippet.description}</p>
                            {feedback && <Feedback message={feedback} />}
                        </div>
                    </div>
                }
                <Comments onDelete={handleOnDelete} onComment={handleComment} text={this.setState.text} comments={this.state.comments} id={videoId} updateComments={handleShowComments} mode={this.props.mode} />
            </div>
        </section>
    }
}

export default withRouter(Video)