import React, { Component } from 'react'

class Video extends Component {

    componentDidMount() {

        const { props: { videoId } } = this

        console.log(videoId)
    }

    render() {

        const { props: {videoId}} = this

        return <section>
            <iframe src={`https://www.youtube.com/embed/${videoId}`} width="100%" height="800"></iframe>
        </section>
    }
}

export default Video