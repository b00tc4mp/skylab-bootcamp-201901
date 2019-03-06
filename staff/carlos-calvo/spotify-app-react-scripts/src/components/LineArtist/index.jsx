'use strict'

import React, { Component } from 'react'
import Player from '../Player'
import logic from '../../logic'

class LineArtist extends Component {
    state = { id: null, comment: null, listofComments: [] }

    // componentDidMount() {
    //     const { props: { trackId } } = this

    //     this.handleTrackSelected(trackId)
    // }

    componentWillMount() {
        const { props: { id } } = this

        this.setState({id}) 

        logic.retrieveCommentsfromArtist(id)
            .then(listofComments =>{
                debugger
                console.log('The mother', + listofComments.text)
                this.setState({listofComments})
            })
            .catch(error => error.message)
    }

    // componentDidMount() {
    //     const { props: { id } } = this

    //     this.setState({id})
    // }

    // componentWillReceiveProps(props) {
    //     const { trackId } = props

    //     this.handleTrackSelected(trackId)
    // }
    // handleEmailInput = event => this.setState({ email: event.target.value })
    onHandleComment = (event) => {
        this.setState({comment : event.target.value})
    }

    onSaveComment = event => {
        event.preventDefault()
        try {
            logic.addCommenttoArtist(this.state.id, this.state.comment )
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { props: { id } } = this

        return <li className="results__item" key={id}><a href="#" onClick={(event) => { event.preventDefault(); return this.props.onItemClick(id);}}>{this.props.title}</a> <i onClick={(event) => event.preventDefault()}></i>
            <form>
            <textarea rows="7" cols="35" onChange = {this.onHandleComment}></textarea>
            <p></p>
            <button onClick={this.onSaveComment}>Save</button>
        </form>
        </li>
    }
}

export default LineArtist