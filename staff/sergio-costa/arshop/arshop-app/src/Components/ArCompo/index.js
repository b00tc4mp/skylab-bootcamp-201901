import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Scene, Entity } from 'aframe-react'
import './index.sass'

const { REACT_APP_API_URL } = process.env

class ArCompo extends Component {

    onClose = () => {
        var video = document.getElementsByTagName('video')[0]
        video.parentNode.removeChild(video)

        var body = document.getElementsByTagName('body')[0]
        body.removeAttribute("style")
        window.location.reload()
        this.props.history.replace('/')
    }

    render() {

        return <section className="ar">
            <button className="ar__btn" onClick={() => this.onClose()}>
            Close
            </button>
            <a-scene embedded artoolkit='sourceType: webcam'>
                <a-entity obj-model={`obj: url(${REACT_APP_API_URL}/object3d/${this.props.productId}.obj)`} position="0 0 0" rotation="-90 180 180" scale="0.1 0.1 0.1"></a-entity>
                <a-marker-camera preset='hiro'></a-marker-camera>
            </a-scene>
        </section>
    }
}

export default withRouter(ArCompo)