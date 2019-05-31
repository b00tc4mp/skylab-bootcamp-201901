import React, { Component } from 'react'
import './index.scss'

class UploadGamePanel extends Component {
    state = {
        title: '',
        genre: 'Action',
        description: '',
        images: '',
        gameFile: ''
        // coverImage:''
    }

    //onInputChange = (event) => {
        //this.setState({ [event.target.name]: event.target.file[0] })
    //}

    onSubmit = (event) => {
        event.preventDefault()
        const { onUploadGame } = this.props
        const { title, genre, description, images, gameFile } = this.state

        onUploadGame(title, genre, description, images, gameFile)
    }


    render() {
        const { history } = this.props
        const { onInputChange, onSubmit } = this

        return <div>
            <h2>Upload a new game</h2>
            <form  action="/profile" method="post" enctype="multipart/form-data" onSubmit={onSubmit}>
                <p>Title</p><input required name="title" placeholder="Insert Game Title" type="text" onChange={event => {event.preventDefault(); this.setState({title: event.target.value})}} />
                <p>Genre</p><select required name="genre" onChange={event => {event.preventDefault(); this.setState({genre: event.target.value})}}>
                    <option value="Action">Action</option>
                    <option value="Platforms">Platforms</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Sports">Sports</option>
                    <option value="Uncategorized">Uncategorized</option>

                </select>
                <p>Description</p><input required name="description" placeholder="Insert Game description" type="text" onChange={event => {event.preventDefault(); this.setState({description: event.target.value})}} />
                <p>File</p><input required name="gameFile" placeholder="TO CHANGE: INSERT A COVER IMAGE" type="file" onChange={event => {event.preventDefault(); this.setState({gameFile: event.target.files[0]})}} />
                {/* <p>Cover Image</p><input required name="coverImage" placeholder="TO CHANGE: INSERT A FILE" type="file" onChange={event => onInputChange(event)} /> */}
                <p>Images</p><input required name="images" placeholder="TO CHANGE: INSERT IMAGES " type="file" onChange={event => {event.preventDefault(); this.setState({images: event.target.files[0]})}} />
                <br /><button>Upload Game</button>
            </form>
        </div>
    }
}

export default UploadGamePanel