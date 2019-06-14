import React, {Component, Fragment} from 'react'
import './index.sass'
import { toast } from 'react-toastify';
import logic from '../../logic'

class EditBook extends Component {


    state = {
        name:'',
        place: '',
        title: '',
        book: null
    }

    handleTitleInput = (event) => this.setState({ title: event.target.value })
    handleNameInput = (event) => this.setState({ name: event.target.value })
    handlePlaceInput = (event) => this.setState({ place: event.target.value })


    componentDidMount = () => {
        try {
            logic.retrieveBook(this.props.bookid)
            .then(bookretieved => {
                let book = bookretieved
                if(book.title) this.setState({title: book.title})
                if(book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name')) this.setState({name : book.parameters.name}, ()=> {})
                if(book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place')) this.setState({place : book.parameters.place}, ()=> {})
                this.setState({book}, () => {})
            })
            .catch(error => this.notify(error))
        } catch (error) {
            this.notify(error)
        }
    }

    notify = (error) => {
        error ? 
        toast.warn("There was something wrong...", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
          :
        toast.info("Book Updated", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
          });
    }

    updateBook = (event) =>{
        event.preventDefault()
        const { state: { name, place, title } } = this
        const { props: { bookid } } = this
        let parameters = {}
        if(name) parameters.name= name
        if(place) parameters.place= place
        try{
            logic.updateBook(bookid, title, parameters)
            .then(()=> this.notify())
            .catch(error => this.notify(error))
        } catch(error){
            this.notify(error)
        }
    }

    render() {

        const { state : { book, title, place, name } } = this
        return (
            <Fragment>
                <div className="coverright">
                    <div className="editFormcontainer">
                        <form className="editForm" onSubmit={this.updateBook}> <p>EDIT BOOK</p>
                                {book  && book.title ? 
                                    <div className="editForm__parameters"><label htmlFor="uname"><b>Your book title is: </b></label><input className="editForm__input" type="text" placeholder="Your title is ..." value={title} onChange={this.handleTitleInput} required /> <br/></div> 
                                    :
                                    <div className="editForm__parameters"></div>
                                }
                                {book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name') ?  
                                    <div className="editForm__parameters"><label htmlFor="uname"><b>Your main name is: </b></label><input className="editForm__input" type="text" placeholder="Your main name is ..." value={name} onChange={this.handleNameInput} required /> <br/></div> 
                                    : 
                                    <div></div> 
                                }
                                
                                {book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place') ? 
                                    <div className="editForm__parameters"><label htmlFor="uname"><b>Your main place is: </b></label><input className="editForm__input" type="text" placeholder="Your place is ..." value={place} onChange={this.handlePlaceInput} required />  <br/></div> 
                                    : 
                                    <div></div> 
                                }
                                <button className="editForm__submit" type="submit">Update Book!</button>    
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default EditBook;