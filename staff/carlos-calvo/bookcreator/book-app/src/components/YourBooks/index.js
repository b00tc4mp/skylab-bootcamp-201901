import React, {Component, Fragment} from 'react'
import SideBar from '../SideBar'
import logic from '../../logic';
import CardBook from '../CardBook';
import './index.sass'
import { ToastContainer, toast } from 'react-toastify';

class YourBooks extends Component {

    state = {
        books: [],
        editBookVisible: false,
        toastId: null
    }

    deleteBook = (id) => {
        return logic.deleteBook(id)
        .then(()=> {
            // this.notify()
            this.retrieveYourBooks()
        })
    }


    retrieveYourBooks(){
        try {
            logic.retrieveBooks()
                .then((books) => {
                    this.setState({books}, () => {})
                    console.log(books)
            })
        } catch (error) {
            console.log(error)
        }
    }

    editBook = (bookid) =>{
        this.props.editBook(bookid)
    }

    addBookToTemplates = (id, isTemplate) =>{
        try {
            logic.addBookToTemplates(id, isTemplate)
                .then((books) => {})
        } catch (error) {
            console.log(error)
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
                    <div className="cardContainer">
                        {books.length && books.map(book =>{
                            return (<CardBook bookSelected={book} deleteBook = {this.deleteBook} editBook={this.editBook} loadBook = {this.props.loadBook} addBookToTemplates={this.addBookToTemplates} />)
                            })}
                    </div>  
                </div>
            </Fragment>
        )
    }
}
export default YourBooks;