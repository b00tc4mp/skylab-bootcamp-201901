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
        let { title, genre, description, images, gameFile } = this.state
        title = title.toLocaleLowerCase()
        genre = genre.toLocaleLowerCase()
        onUploadGame(title, genre, description, images, gameFile)
    }


    render() {
        const { history } = this.props
        const {onSubmit } = this

        return <div className="uploadGame">
            <h2 className="uploadGame__title">Upload a new game</h2>
            <form action="/profile" method="post" enctype="multipart/form-data" onSubmit={onSubmit}>
                <p className="uploadGame__headers">Title</p><input required className ="uploadGame__input" name="title" placeholder="Insert Game Title" type="text" onChange={event => { event.preventDefault(); this.setState({ title: event.target.value }) }} />
                <p className="uploadGame__headers">Genre</p><select className="uploadGame__genresSelect"required name="genre" onChange={event => { event.preventDefault(); this.setState({ genre: event.target.value }) }}>
                    <option value="Action">Action</option>
                    <option value="Platforms">Platforms</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Sports">Sports</option>
                </select>
                <p className="uploadGame__headers">Description</p><textarea className="uploadGame__descriptionBox"required name="description" placeholder="Insert Game description" type="text" onChange={event => { event.preventDefault(); this.setState({ description: event.target.value }) }} />
                <p className="uploadGame__headers">File</p><input className ="uploadGame__button"required name="gameFile"  type="file" onChange={event => { event.preventDefault(); this.setState({ gameFile: event.target.files[0] }) }} />
                <p className="uploadGame__headers">Images</p><input className ="uploadGame__button"required name="images"  type="file" onChange={event => { event.preventDefault(); this.setState({ images: event.target.files[0] }) }} />
                <br/><button className="uploadGame__uploadButton fas fa-upload"></button>
            </form>
        </div>
    }
}

export default UploadGamePanel