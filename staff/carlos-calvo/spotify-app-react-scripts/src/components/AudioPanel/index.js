import React, { Component } from 'react';

class AudioPanel extends React.Component{
    state = {color: 'white'};

    changecolor() {

        const color = this.state.color //se hace así
        if(this.state.color = "white"){ //case from no favorite to favorite
            let heart = document.getElementById("heart")
            heart.setAttribute("style", "background-color: red;")
            this.setState({color: 'red'})
            this.props.toggleFavorite(this.props.trackId)

        } else{//case from favorite to no favorite
            let heart = document.getElementById("heart")
            this.setState({color: 'white'})
            heart.setAttribute("style", "background-color: white;")
            this.props.toggleFavorite(this.props.trackId)
        }
    }

    render(){
        const {props: {previewurl, trackId}} = this

        return<section>
            <audio src={previewurl} controls autoPlay></audio>
                <div data-id={trackId}>
                    <i id="heart" onClick = {() => this.changecolor()} className ="far fa-heart"></i>
                </div>
        </section>
    }
}

export default AudioPanel