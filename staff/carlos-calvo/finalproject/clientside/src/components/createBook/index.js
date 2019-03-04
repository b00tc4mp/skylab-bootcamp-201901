import React, {Component, Fragment} from 'react';
import SideBar from '../sidebar';
import './index.sass'
import logic from '../../logic'
import ProgressBar from '../progressBar';
class CreateBook extends Component {
  
    state = {
        title: null,
        textContent: '',
        urlCover : '',
        medida: 33,
        step1: true,
        step2: false,
    }

    handleEmailInput = (event) => this.setState({ title: event.target.value })

    onLoadFiles = (event) => {
        event.preventDefault();

        let selectedFile = document.getElementById("inputtext").files[0]
        if(!selectedFile) return //Haria falta avisar al usuario.
        var reader = new FileReader();
        reader.readAsText(selectedFile, "UTF-8");
        reader.onload = (evt) => {
            this.setState({textContent :evt.target.result, urlCover :evt.target.result}, () => this.addBook())
        }

        //Aquí también al leer el fichero debería de calcular los tags de imagenes y parametros. 
        //Parte de upload photo a Cloudinary
    }

    addBook = () => {
        try{
            logic.addBook( this.state.title, this.state.textContent, this.state.urlCover )
            .then((book) => console.log(1234)) //Para la siguiente pantalla mostrar 
        } catch (error){
            console.log(error)
        }
    }
    
    render() {
        return (
        <Fragment>
            <div>
            <SideBar></SideBar>
            </div>
            <div className="rightsidebar coverright">
                <div className="formCreateBook">
                    <form onSubmit={this.onLoadFiles}>STEP 1
                    <ProgressBar level={this.state.medida}></ProgressBar><br/>
                        <label htmlFor="uname"><b>Your books title</b></label>
                        <input type="text" value={this.state.email} placeholder="Enter title for the book" name="uname" onChange={this.handleEmailInput} required /> <br/>
                        <div className="row justify-content-center">
                            <label htmlFor="uname" className="col-5"><b>Enter a txt file for your book </b></label>
                            <input id="inputtext" className="col-5" type="file"/>
                        </div>    
                        <div className="row justify-content-center">
                            <label htmlFor="uname" className="col-5"><b>Enter a coverphoto </b></label>
                            <input id="inputcover" className="col-5" type="file"/>
                        </div>    
                        <button className="btn btn-info" type="submit">Go!</button>    
                    </form>
                </div>
            </div>
        </Fragment>
        );
    }
}

export default CreateBook;