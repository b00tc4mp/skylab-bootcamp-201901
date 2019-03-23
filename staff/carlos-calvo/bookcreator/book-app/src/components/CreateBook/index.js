import React, {Component, Fragment} from 'react';
import './index.sass'
import cloudinary from '../../cloudinary'
import { toast } from 'react-toastify';
import logic from '../../logic'
import {ProgressBar} from 'react-bootstrap'

class CreateBook extends Component {
  
    isnameTag = false
    isplaceTag = false
    medida1 = 50
    medida2 = 100

    state = {
        title: '',
        textContent: '',
        imageCover : null,
        step1: true,
        messageFeedback: '',
        name: '',
        place: '',
        images: []
        
    }

    handleTitleInput = (event) => this.setState({ title: event.target.value })
    handleNameInput = (event) => this.setState({ name: event.target.value })
    handlePlaceInput = (event) => this.setState({ place: event.target.value })
    handleTextChange = (event) => {
        this.isnameTag = event.target.value.includes('<name>')
        this.isplaceTag = event.target.value.includes('<place>')
        this.setState({textContent: event.target.value})}

    nextStep = (event) => {
        event.preventDefault()
        this.setState({step1: false})
    }

    backStep = (event) => {
        event.preventDefault()
        this.setState({step1: true})
        this.forceUpdate()
    }

    handleFileChange = e => {
        let files = e.target.files
        let reader = new FileReader()
        
        if (files.length) {
            reader.readAsDataURL(files[0])
            let name = e.target.name
            this.setState({[name]: files[0]}, () => {})
        }
    }

    addBook = (e) => {
        e.preventDefault()
        const {state:{name, place}} = this
        let parameters = {}
        if(this.isnameTag) parameters.name = name
        if(this.isplaceTag ) parameters.place = place
        if(this.state.textContent.length == 0){
            this.notifyEmpty()
            return
        }
        try{
            cloudinary.addImage(this.state.imageCover)
            .then(url => {
                return logic.addBook( this.state.title, this.state.textContent, url, parameters )
                    .then((book) => this.notify())
                    .catch(error => this.notify(error)) //Para la siguiente pantalla mostrar 
            })
        } catch (error){
            this.notify(error)
        }
    }

    notifyEmpty = () =>{
        toast.warn("The content of the book is empty", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
    }
    
    notify = (error) => {
        error ? 
        toast.warn("There was something wrong when reating a book...", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
          :
        toast.info("Book Created! Go to YourBooks Area", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2500
          });
    }


    render() {
        return (
        <Fragment>
            <div className="coverright ">
             {this.state.step1 ? 
                <Fragment>
                    <div className = "formCreateBook" >
                        <form onSubmit={this.nextStep}>
                            <div className="formCreateBook_step"><h2>STEP 1 / 2</h2>
                            </div>
                            <ProgressBar animated now={this.medida1}></ProgressBar><br/>
                            <div className="inputTitleContainer">
                                <label className="inputTitleContainer__label" htmlFor="uname"><b>Your books title</b></label>
                                <input className="inputTitleContainer__title" type="text" value={this.state.title} placeholder="Enter title for the book" name="uname" onChange={this.handleTitleInput} required/> <br/>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="uname" className="inputContainer__label"><i className="fa fa-cloud-upload">Enter a coverphoto</i></label>
                                <input onChange={this.handleFileChange} id="inputcover" accept=".jpg,.png,.gif,.bmp" name="imageCover" className="inputfile" type="file" required/>
                            </div>
                            <div className="inputContainertext">
                                <textarea className="inputContainertext__textarea" onChange={this.handleTextChange} placeholder="Enter your tagged text here" value={this.state.textContent} maxLength="8000000" required>
                                    </textarea>
                            </div>    
                            <div className="formButtonContainer">   
                                <button className="btn btn-info" type="submit">To Next Step!</button>   
                            </div> 
                        </form>
                    </div> 
                    <div className="instructionsContainer">
                        <p className="typewriter">Tag with &lt;Chapter&gt; so you can split the book into chapters </p>
                        <p className="typewriter">Tag with &lt;name&gt; so you can personalize the main protagonist </p>
                        <p className="typewriter">Tag with &lt;place&gt; so you can personalize the main place </p>
                    </div>
                </Fragment>
                :
                <div className="formCreateBook">
                    <form onSubmit={this.addBook}>
                        <div className="formCreateBook_step"><h2>STEP 2 / 2</h2>
                        </div>
                        <ProgressBar animated now={this.medida2}></ProgressBar><br/>
                        <label htmlFor="uname"><b>Your main character is: </b></label>
                        <div>
                            {this.isnameTag  ? 
                                <div className="inputParams"><input type="text" placeholder="Your main character is ..." onChange={this.handleNameInput} required /> <br/></div> 
                                : 
                                <div className="inputParams"><input type="text" placeholder="You have not inserted a tag for name" disabled/> <br/></div> 
                            }
                            <label htmlFor="uname"><b>Your main place is: </b></label>
                            {this.isplaceTag  ? 
                                <div className="inputParams"><input type="text" placeholder="Your place is ..." onChange={this.handlePlaceInput} required /> <br/></div> 
                                : 
                                <div className="inputParams"><input type="text" placeholder="You have not inserted a tag for place" disabled/> <br/></div> 
                            }
                            <div className="formButtonContainer">
                                <button className="btn btn-secondary" onClick={this.backStep}>Back</button>   
                                <button className="btn btn-info" type="submit" >Go!</button>    
                            </div>
                        </div>
                    </form>
                </div>
             }
            </div>
        </Fragment>
        );
    }
}

export default CreateBook;