import React, { Component } from 'react'
import './index.scss'

class UploadGamePanel extends Component {
    state = {
        title: '',
        genre: 'Action',
        description: '',
        images: '',
        gameFile: ''
    }

    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const {onUploadGame} = this.props
        const {title, genre, description, images, gameFile}= this.state
    
        onUploadGame(title, genre, description, images, gameFile)
    }


    render(){
        const {history} = this.props
        const {onInputChange, onSubmit} = this

        return <div>
            <form onSubmit = {onSubmit}>
            <input required name="title" placeholder="Insert Game Title" type="text" onChange = {event => onInputChange(event)} />
            <select required name="genre"  onChange = {event => onInputChange(event)}>
                <option value="Action">Action</option>
                <option value="Platforms">Platforms</option>
                <option value="Shooter">Shooter</option>
                <option value="Adventure">Adventure</option>
                <option value="Sports">Sports</option>
            </select>
            <input required name="description" placeholder="Insert Game description" type="text" onChange = {event => onInputChange(event)}/>
            <input required name="images" placeholder="TO CHANGE: USER WILL INSERT IMAGES " type="text" onChange = {event => onInputChange(event)}/>
            <input required name="gameFile" placeholder="TO CHANGE: USER WILL INSERT A FILE" type="text" onChange = {event => onInputChange(event)}/>
            </form>
            <button onClick = {()=> history.push("/")}>Home</button>
        </div>
    }
}

export default UploadGamePanel