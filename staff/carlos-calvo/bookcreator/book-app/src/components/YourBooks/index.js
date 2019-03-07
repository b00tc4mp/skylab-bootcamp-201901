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
            this.notify()
            this.retrieveYourBooks()
        })
    }

    notify = () => {
        toast("Default Notification !");
        debugger
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_CENTER
        })
    }


    retrieveYourBooks(){
        try {
            logic.retrieveBooks()
                .then((books) => {
                    this.setState({books}, () => {})
            })
        } catch (error) {
            console.log(error)
        }
    }

    editBook = (bookid) =>{
        this.props.editBook(bookid)
    }

    componentDidMount(){
        this.retrieveYourBooks()
    }

    render() {

        const {state : { books} } = this
        return (
            <Fragment>
                <div>
                    <SideBar/>
                </div>
                <div className = "coverright">
                    <div className="row justify-content-center">
                        {books && books.map(book =>{
                            return (<CardBook bookSelected={book} deleteBook = {this.deleteBook} editBook={this.editBook} loadBook = {this.props.loadBook} />)
                            })}
                    </div>  
                </div>
                <ToastContainer/>
            </Fragment>
        )
    }
}
export default YourBooks;