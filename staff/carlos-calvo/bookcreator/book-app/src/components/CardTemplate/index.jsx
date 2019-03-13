import React, {Component, Fragment} from 'react'
import './index.sass'
import logic from '../../logic';


class CardTemplate extends Component {

    addTemplateToUserBooks = (event) =>{
        event.preventDefault()
        try {
            logic.addTemplateToUserBooks(this.props.bookSelected._id)
        } catch (error) {
            
        }
    }

    loadTemplateBook = (event) => {
        event.preventDefault()
        this.props.loadTemplateBook(this.props.bookSelected._id)
    }

    render() {
        const book = this.props.bookSelected
        return (
            <Fragment>
                <div className="bookCard" >
                    <div className="bookCard__photocontainer">
                        <img className="imagen" src={book.coverphoto}/>
                    </div>
                    <div className="cardBody">
                        <div className="cardBody__title" data-toggle="tooltip" data-placement="top" title={book.title}>
                            <h5 className="title">{book.title}</h5>
                        </div>
                        <div className="cardBody__name">
                            {book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name')? 
                            <p className="cardBody__text">Name<i className="fas fa-user-circle"></i> {book.parameters.name}</p>:
                            <p className="cardBody__text">Name<i className="fas fa-user-circle"></i> No name tag in this book</p>
                            }
                        </div>
                        <div className="cardBody__place">
                            {book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place') ? 
                            <p className="cardBody__text">Place :<i className="fas fa-user-circle"></i> {book.parameters.place}</p>
                                :
                            <p className="cardBody__text">Place :<i className="fas fa-user-circle"></i> No place tag in this book</p>
                            }
                        </div>
                        <div className="cardBody__buttonContainer">
                            <button onClick={this.loadTemplateBook} className="butt butt--read" data-toggle="tooltip" data-placement="top" title="Read Book"><i className="fas fa-book-reader"></i></button>
                            <button onClick={this.addTemplateToUserBooks} className="butt butt--addtemplate" data-toggle="tooltip" data-placement="top" title="Add to your books"><i class="fas fa-bookmark"></i></button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default CardTemplate;