import React, {Component, Fragment} from 'react';
import './index.sass'
import cloudinary from '../../cloudinary'
import ProgressBar from '../ProgressBar';
import { toast } from 'react-toastify';

import logic from '../../logic'

class CreateBook extends Component {
  
    isnameTag = true
    isplaceTag = true
    medida1 = 33
    medida2 = 70

    state = {
        title: null,
        textContent: '',
        imageCover : '',
        step1: true,
        messageFeedback: '',
        name: '',
        place: '',
        images: []
        
    }

    handleTitleInput = (event) => this.setState({ title: event.target.value })
    handleNameInput = (event) => this.setState({ name: event.target.value })
    handlePlaceInput = (event) => this.setState({ place: event.target.value })

    nextStep = (event) => {
        event.preventDefault();
        this.setState({step1: false})
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

    handleFileTextChange = e => {
        let files = e.target.files
        let reader = new FileReader()
        if (files.length) {
            reader.readAsText(files[0], "CP1251")
            reader.onload = (evt) => {
                this.isnameTag = evt.target.result.includes('<name>')
                this.isplaceTag = evt.target.result.includes('<place>')
                this.setState({textContent: evt.target.result }, () => {})

            }
        }
    }

    addBook = (e) => {
        e.preventDefault()
        const {state:{name, place}} = this
        let parameters = {}
        if(this.isnameTag) parameters.name = name
        if(this.isplaceTag ) parameters.place = place
        
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


    
    notify = (error) => {
        error ? 
        toast.warn("There was something wrong when reating a book...", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
          :
        toast.info("Book Created!", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
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
                            <ProgressBar level={this.medida1}></ProgressBar><br/>
                            <div className="inputTitleContainer">
                                <label className="inputTitleContainer__label" htmlFor="uname"><b>Your books title</b></label>
                                <input className="inputTitleContainer__title" type="text" value={this.state.email} placeholder="Enter title for the book" name="uname" onChange={this.handleTitleInput} required /> <br/>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="uname" className="col-5"><i class="fa fa-cloud-upload">Enter a coverphoto</i></label>
                                <input onChange={this.handleFileChange} id="inputcover" accept=".jpg,.png,.gif,.bmp " name="imageCover" className="inputfile" type="file" required/>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="uname" className="col-5"><i class="fa fa-cloud-upload">Enter a file txt</i></label>
                                <input onChange={this.handleFileTextChange} accept=".txt" id="inputtext" name="textContent" className="inputfile" type="file" required/>
                            </div>    
                            <div className="formButtonContainer">   
                                <button className="btn btn-info" type="submit">To Next Step!</button>   
                            </div> 
                        </form>
                    </div> 
                    <div className="instructionsContainer">
                        <p className="typewriter">Tag with &lt;chapter&gt; so you can split the book into chapters </p>
                        <p className="typewriter">Tag with &lt;name&gt; so you can personalize the main protagonist </p>
                        <p className="typewriter">Tag with &lt;place&gt; so you can personalize the main place </p>
                    </div>
                </Fragment>
                :
                <div className="formCreateBook">
                    <form onSubmit={this.addBook}>STEP 2
                        <ProgressBar level={this.medida2}></ProgressBar><br/>
                        <label htmlFor="uname"><b>Your main character is: </b></label>
                        <div>
                            {this.isnameTag  ? 
                                <div><input type="text" placeholder="Your main character is ..." onChange={this.handleNameInput} required /> <br/></div> 
                                : 
                                <div><input type="text" placeholder="You have not inserted a tag for name" disabled/> <br/></div> 
                            }
                            <label htmlFor="uname"><b>Your main place is: </b></label>
                            {this.isplaceTag  ? 
                                <div><input type="text" placeholder="Your place is ..." onChange={this.handlePlaceInput} required /> <br/></div> 
                                : 
                                <div><input type="text" placeholder="You have not inserted a tag for place" disabled/> <br/></div> 
                            }
                            <div className="formButtonContainer">   
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