import React, {Component, Fragment} from 'react';
import './index.sass'
import logic from '../../logic'
import ProgressBar from '../ProgressBar';
import SideBar from '../SideBar';
import Feedback from '../Feedback';
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
                console.log(this.isnameTag, this.isplaceTag)
                console.log(this.state.textContent)
            }
        }
    }

    addBook = () => {
        const {state:{name, place}} = this
        let parameters = {}
        if(this.isnameTag) parameters.name = name
        if(this.isplaceTag ) parameters.place = place
        
        try{
            logic.addBook( this.state.title, this.state.textContent, this.state.imageCover, parameters )
            .then((book) => console.log(book)) //Para la siguiente pantalla mostrar 
        } catch (error){
            console.log(error)
        }
    }
    
    render() {
        return (
        <Fragment>
            <div>
                <SideBar/>
            </div>
            <div className="coverright ">
             {this.state.step1 ? 
                <div className = "formCreateBook" >
                    <form onSubmit={this.nextStep}>STEP 1
                    <ProgressBar level={this.state.medida}></ProgressBar><br/>
                        <label htmlFor="uname"><b>Your books title</b></label>
                        <input type="text" value={this.state.email} placeholder="Enter title for the book" name="uname" onChange={this.handleTitleInput} required /> <br/>
                        <div className="row justify-content-center">
                            <label htmlFor="uname" className="col-5"><b>Enter a txt file for your book </b></label>
                            <input onChange={this.handleFileTextChange} accept=".txt" id="inputtext" name="textContent" className="col-5" type="file" required/>
                        </div>    
                        <div className="row justify-content-center">
                            <label htmlFor="uname" className="col-5"><b>Enter a coverphoto </b></label>
                            <input onChange={this.handleFileChange} id="inputcover" accept=".jpg,.png,.gif,.bmp " name="imageCover" className="col-5" type="file" required/>
                        </div>    
                        <button className="btn btn-info" type="submit">Go!</button>    
                    </form>
                </div> :
                <div className="formCreateBook">
                    <form onSubmit={this.addBook}>STEP 2
                        <ProgressBar level={this.state.medida2}></ProgressBar><br/>
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
                            <button className="btn btn-info" type="submit">Go!</button>    
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