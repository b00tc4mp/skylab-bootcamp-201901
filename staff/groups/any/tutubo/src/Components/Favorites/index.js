import React, { Component } from 'react'
import logic from '../../logic'

class Favorites extends Component {

    state = { videos: [] }

    componentDidMount() {

        logic.retrieveLikes()
            .then((items) => {
                
                   if(items.likes){
                       console.log(items.likes)
                       return items.likes
                   }
                }
            )

    }

    // onVideoSelected = id => {

    //     const {props : { selectVideo }} = this

    //     selectVideo(id)
    // }


    render() {

        const { onVideoSelected, state: { videos }, props: { mode } } = this

        return <section className="videolist">
            <div className={`${mode ? `searchVideoList searchVideoList-light` : 'searchVideoList searchVideoList-dark'}`}>
                {videos.map(({ id: { videoId }, snippet: { title, channelId, publishedAt, channelTitle, description, thumbnails: { medium: { url } } } }) => {
                    return <div className="videoResults" key={videoId} onClick={() => onVideoSelected(videoId)} >
                        <div className="resultsThumbnail">
                            <img src={url} />
                        </div>
                        <div className="searchResultsText">
                            <h2 className={`${mode ? 'videoSearchTitle videoSearchTitle-light' : 'videoSearchTitle-dark'}`}>{title.length > 50 ? title = `${title.substr(0, 50)}...` : title}</h2>
                            <p className={`${mode ? 'searchChannelTitle searchChannelTitle-light' : 'searchChannelTitle'}`} channel-id={channelId} onClick={() => console.log(channelId)}>{channelTitle} · {publishedAt = publishedAt.substr(0, 10)}</p>
                            <p className={`${mode ? 'searchDes searchDes-light' : 'searchDes'}`}>{description = description.substr(0, 100)}...</p>
                        </div>
                    </div>
                })}
            </div>
        </section>
    }
}

export default Favorites 