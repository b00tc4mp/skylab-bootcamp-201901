import React, {Component, Fragment} from 'react'
import './index.sass'


class CardBook extends Component {

    loadBook = () => {
        this.props.loadBook(this.props.bookSelected._id)
    }

    deleteBook = () =>{
        this.props.deleteBook(this.props.bookSelected._id)
    }

    editBook = () =>{
        this.props.editBook(this.props.bookSelected._id)
    }

    render() {

        const book = this.props.bookSelected
        return (
            <Fragment>
                <div className="bookCard col-sm-8 col-md-5 col-lg-3" >
                    <div className="bookCard-photocontainer">
                        <img className="card-img-top" src={book.coverphoto}/>
                    </div>
                    <div className="card-body">
                        <div>
                            <h5 className="card-title">{book.title}</h5>
                        </div>
                        <div>
                            {book.parameters.name ? 
                            <p className="card-text">Name<i className="fas fa-user-circle"></i> {book.parameters.name}</p>:
                            <p className="card-text">Name<i className="fas fa-user-circle"></i> No name tag in this book</p>
                            }
                        </div>
                        <div>
                            {book.parameters.place ? 
                            <p className="card-text">Place :<i className="fas fa-user-circle"></i> {book.parameters.place}</p>
                                :
                            <p className="card-text">Place :<i className="fas fa-user-circle"></i> No place tag in this book</p>
                            }
                        </div>
                        <div className="bookCard-buttonContainer">
                            <button onClick={this.loadBook} className="btn btn-primary btn-readit"><i className="fas fa-book-reader"></i></button>
                            <button onClick={this.editBook} className="btn btn-primary btn-readit"><i className="fas fa-edit"></i></button>
                            <button onClick={this.deleteBook} className="btn btn-danger btn-deleteit"><i className="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default CardBook;