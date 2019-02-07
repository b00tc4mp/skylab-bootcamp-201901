import React, { Component } from 'react'
import logic from '../../logic'
import VideoFav from '../VideoFav'

class Favorites extends Component {

    state = { videosid: [] }

    componentDidMount() {

        try {
        logic.retrieveLikes()
        .then((items) => {
               if(items.likes){
                   this.setState({videosid: items.likes})
               }
            }
        )

        } catch (err) {
            console.log(err.message)
        }
    }

    // onVideoSelected = id => {

    //     const {props : { selectVideo }} = this

    //     selectVideo(id)
    // }
    
    
    render() {

        const { state: { videosid }, props: { mode } } = this
        return <section className="videolist">
            <div className={`${mode ? `searchVideoList searchVideoList-light` : 'searchVideoList searchVideoList-dark'}`}>
                {videosid.map( id => <VideoFav id={id} selectVideo = {this.props.selectVideo}/>)}                
            </div>
        </section>
    }
}

export default Favorites