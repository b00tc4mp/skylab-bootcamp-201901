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
                <p>Title</p><input required name="title" placeholder="Insert Game Title" type="text" onChange={event => onInputChange(event)} />
                <p>Genre</p><select required name="genre" onChange={event => onInputChange(event)}>
                    <option value="Action">Action</option>
                    <option value="Platforms">Platforms</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Sports">Sports</option>
                    <option value="Uncategorized">Uncategorized</option>

                </select>
                <p>Description</p><input required name="description" placeholder="Insert Game description" type="text" onChange={event => onInputChange(event)} />
                <p>Images to upload</p><input required multiple name="images[]" placeholder="TO CHANGE: INSERT IMAGES " type="file" onChange={event => onInputChange(event)} />
                <p>File to upload</p><input required name="gameFile[]" placeholder="TO CHANGE: INSERT A FILE" type="file" onChange={event => onInputChange(event)} />
                <br /><button>Upload Game</button>
            </form>
        </div>
    }
}

export default UploadGamePanel