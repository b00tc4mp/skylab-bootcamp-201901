import React, { Component } from 'react';
import './index.sass';

class AudioPanel extends React.Component{
    state = {color: 'white'};

    changeColor() {

        const color = this.state.color //se hace así

        if(color == "white"){ //case from no favorite to favorite
            let heart = document.getElementById("heart")
            heart.setAttribute("style", "background-color: red;")
            this.setState({color: 'red'})
            this.props.toggleFavorite(this.props.trackId, this.props.previewurl)

        } else {//case from favorite to no favorite
            let heart = document.getElementById("heart")
            this.setState({color: 'white'})
            heart.setAttribute("style", "background-color: none;")
            this.props.toggleFavorite(this.props.trackId, this.props.previewurl)
        }
    }

    render(){
        const {props: {previewurl, trackId}} = this

        return<section>
            <audio src={previewurl} controls autoPlay></audio>
                <div data-id={trackId}>
                    <i id="heart" onClick = {() => this.changeColor()} className ="far fa-heart"></i>
                </div>
        </section>
    }
}

export default AudioPanel