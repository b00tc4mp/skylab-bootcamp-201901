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
                <div className="card col-sm-9 col-md-6 col-lg-4" >
                    <img className="card-img-top" width="70%"  height="50%" src={book.coverphoto}/>
                    <div className="card-body">
                        <h5 className="card-title">{book.title}</h5>
                        <p className="card-text">{book.content.substring(0, 45)}</p>
                        <button onClick={this.loadBook} className="btn btn-primary">Read It!</button>
                        <button onClick={this.deleteBook} className="btn btn-danger">Delete It!</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default CardBook;