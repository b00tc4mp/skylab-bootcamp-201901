import React, {Component, Fragment} from 'react'
import SideBar from '../SideBar'
import './index.sass'
import logic from '../../logic';

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
        } catch (error) {
            console.log(error)
        }
    }


    updateBook = () =>{
        const { state: { name, place, title } } = this
        const { props: { bookid } } = this
        let parameters = {}
        if(name) parameters.name= name
        if(place) parameters.place= place
        try{
            logic.updateBook(bookid, title, parameters)
        } catch(error){
            console.log(error)
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
                                    <div className="editForm__parameters"><input type="text" placeholder="There is no parametizable name in this book" disabled/> <br/></div> 
                                }
                                
                                {book  && book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place') ? 
                                    <div className="editForm__parameters"><label htmlFor="uname"><b>Your main place is: </b></label><input className="editForm__input" type="text" placeholder="Your place is ..." value={place} onChange={this.handlePlaceInput} required />  <br/></div> 
                                    : 
                                    <div className="editForm__parameters"><input type="text" placeholder="There is no parametizable name in this book" disabled/> <br/></div> 
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