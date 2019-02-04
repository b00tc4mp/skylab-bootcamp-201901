import React, { Component } from 'react'
import logic from '../../logic'
import Comments from '../Comments'

class Video extends Component {

    state = { comment: {}, videoId: '' }

    componentDidMount() {

        const { props: { videoId } } = this

        console.log(videoId)

        this.handleShowComments()
    }

    handleComment = (videoId, text) => {
        try {
            logic.commentVideo(videoId, text)
                .then(() => {})
                .catch(console.log('bitch shut the fuck up'))
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }

    handleShowComments = () => {
        try {
            logic.showComments()
                .then(comment => {
                    this.setState(comment)
                })
                .catch(console.log('bitch shut the fuck up'))
        } catch {
            this.setState(/* sets state of feedback messafe again in case of error beforehand */)
        }
    }
    

    render() {

        const { props: {videoId}, handleComment } = this

        return <section>
            <iframe title={videoId} src={`https://www.youtube.com/embed/${videoId}`} width="100%" height="800"></iframe>
            <Comments onComment={handleComment} text={this.setState.text} commentsList={this.state.comment} />
        </section>
    }
}

export default Video