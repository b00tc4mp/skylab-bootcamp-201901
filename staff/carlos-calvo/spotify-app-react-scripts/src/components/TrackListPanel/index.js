import React, { Component } from 'react';

class TrackListPanel extends React.Component{
    
    onTrackSelected(id, preview_url){
        const trackSelected = this.props.trackSelected
        trackSelected(id, preview_url)
        console.log(1, id, preview_url)
    }
    

    render(){
        const {props: {trackListResults}} = this
        return<section>
            <h2>Select a track</h2>
            <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select a Track to play
            </a>
            <div className="dropdown-menu">
                {trackListResults.map(({ id, preview_url, name, track_number }) => {
                    return <div className="dropdown-item" id-data={id} onClick = {() => this.onTrackSelected(id, preview_url)}>
                    <h3 className="text-center" >{track_number} - {name}</h3>
                    </div>
                })}
            </div>
            </div>
        </section>
    }
}


export default TrackListPanel