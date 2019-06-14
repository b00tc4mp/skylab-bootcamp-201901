import React, {Component, Fragment} from 'react'
import './index.sass'
import logic from '../../logic';

class CardBook extends Component {

    loadBook = () => {
        this.props.loadBook(this.props.bookSelected._id)
    }

    deleteBook = () =>{
        this.props.deleteBook(this.props.bookSelected._id)
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
                            <p className="card-text">{book.content.substring(0, 45)}</p>  
                        </div>
                        <div className="bookCard-buttonContainer">
                            <button onClick={this.loadBook} className="btn btn-primary btn-readit"><i className="fas fa-book-reader"></i></button>
                            <button onClick={this.loadBook} className="btn btn-primary btn-readit"><i className="fas fa-edit"></i></button>
                            <button onClick={this.deleteBook} className="btn btn-danger btn-deleteit"><i className="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default CardBook;