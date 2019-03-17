import React, {Component, Fragment} from 'react'
import CardBook from '../CardBook';
import './index.sass'
import { toast } from 'react-toastify';
import logic from '../../logic'

class YourBooks extends Component {

    state = {
        books: [],
        editBookVisible: false,
        toastId: null
    }

    deleteBook = (id) => {
        return logic.deleteBook(id)
        .then(()=> {
            this.retrieveYourBooks()
            this.notify()
        })
    }

    notify = (error) => {
        error ? 
        toast.warn("There was something wrong...", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
          })
          :
        toast.info("Book Deleted", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
          });
    }

    notifyUpdate = (error) => {
        error ? 
        toast.warn("There was an error...", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
          })
        :
        toast.info("Book Added to Public Templates", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
          });

    }


    retrieveYourBooks(){
        try {
            logic.retrieveBooks()
                .then((books) => {
                    this.setState({books}, () => {})
            })
        } catch (error) {
            this.notify(error)
        }
    }

    editBook = (bookid) =>{
        this.props.editBook(bookid)
    }

    addBookToTemplates = (id, isTemplate) =>{
        try {
            logic.addBookToTemplates(id, isTemplate)
                .then((books) => {
                    this.notifyUpdate()
                })
        } catch (error) {
            this.notifyUpdate(error)
        }
    }

    componentDidMount(){
        this.retrieveYourBooks()
    }

    render() {

        const {state : { books} } = this
        return (
            <Fragment>
                <div className = "coverright">
                    <h2 className="letter">Your Books</h2>
                    <div className="cardContainer">
                        {books.length?
                        books.length && books.map(book =>{
                            return (<CardBook bookSelected={book} deleteBook = {this.deleteBook} editBook={this.editBook} loadBook = {this.props.loadBook} addBookToTemplates={this.addBookToTemplates} />)
                            })
                        :
                        <div>Ooops You have no Books! Retrieve from templates or create a new one</div>
                    }
                    </div>  
                </div>
            </Fragment>
        )
    }
}
export default YourBooks;