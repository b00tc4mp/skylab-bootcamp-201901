import React, { Component } from 'react'
import logic from '../../logic'
import Comments from '../Comments'
import './index.sass'

class Video extends Component {

    state = { comments: [], videoId: '', text: '', buttonLike: '', buttonDislike: '', videoInfo: '' }

    componentDidMount() {

        const { props: { videoId } } = this

        console.log(videoId)

        this.handleShowComments()
        this.handleVideoInfo(videoId)
    }

    handleComment = (date) => {
        try {
            const {props: {videoId}} = this
            logic.commentVideo(videoId, date)
                .then(() => logic.showComments(videoId))
                    .then(comments => {
                        this.setState({comments})
                    })
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
        } catch({message}) {
            this.setState(console.log(message))
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
    }

    //#region Revisar
    handleOnDelete = date => {
        const {props : {videoId}} = this
        logic.deleteComments(videoId, date)
            .then(() =>  logic.showComments(videoId))
            .then(comments => {
                this.setState({comments})})
    }
    //#endregion

    render() {
        const { props: { videoId, like }, handleShowComments, handleComment, state: { videoInfo }, handleLike, handleDislike, handleOnDelete } = this

        return <section className="section__video">
            <iframe className="iframe" title={videoId} src={`https://www.youtube.com/embed/${videoId}`}></iframe>
            <div className="panel__container">
                {videoInfo &&
                    <div className="video__container">
                        <div className="title-likes">
                            <h2 className="iframe__title">{videoInfo.snippet.title}</h2>
                            <div className="likes">
                                <i className={`${like ? "far fa-thumbs-up blue" : "far fa-thumbs-up"}`} onClick={handleLike}> 2 M</i>
                                <i className="far fa-thumbs-down" onClick={handleDislike}> 14 M</i>
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
            <Comments onDelete={handleOnDelete} onComment={handleComment} text={this.setState.text} comments={this.state.comments} id={videoId} updateComments={handleShowComments} />
                    </div>
        </section>
            }
        }
        
export default Video