import React, {Component, Fragment} from 'react'
import './index.sass'
import logic from '../../logic';


class CardTemplate extends Component {

    addTemplateToUserBooks = () =>{
        try {
            logic.addTemplateToUserBooks(this.props.bookSelected._id)
        } catch (error) {
            
        }
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
                            {book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name')? 
                            <p className="card-text">Name<i className="fas fa-user-circle"></i> {book.parameters.name}</p>:
                            <p className="card-text">Name<i className="fas fa-user-circle"></i> No name tag in this book</p>
                            }
                        </div>
                        <div>
                            {book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place') ? 
                            <p className="card-text">Place :<i className="fas fa-user-circle"></i> {book.parameters.place}</p>
                                :
                            <p className="card-text">Place :<i className="fas fa-user-circle"></i> No place tag in this book</p>
                            }
                        </div>
                        <div className="bookCard-buttonContainer">
                            <button onClick={this.loadBook} className="btn btn-primary btn-readit" data-toggle="tooltip" data-placement="top" title="Read Book"><i className="fas fa-book-reader"></i></button>
                            <button onClick={this.addTemplateToUserBooks} className="btn btn-success btn-deleteit" data-toggle="tooltip" data-placement="top" title="Add to your books"><i class="fas fa-bookmark"></i></button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default CardTemplate;