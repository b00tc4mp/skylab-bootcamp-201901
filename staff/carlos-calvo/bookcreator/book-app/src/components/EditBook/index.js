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
                let book = bookretieved[0]
                if(book.title) this.setState({title: book.title})
                if(book.parameters.name) this.setState({name : book.parameters.name}, ()=> {})
                if(book.parameters.place) this.setState({place : book.parameters.place}, ()=> {})
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
        return (
            <Fragment>
                <div>
                    <SideBar/>
                </div>
                <div className="coverright">
                    <div className="editFormcontainer">
                        <form className="editForm" onSubmit={this.updateBook}> EDIT BOOK
                            <div>
                                <label htmlFor="uname"><b>Your book title is: </b></label>
                                {this.state.book  && this.state.book.title ? 
                                    <div><input type="text" placeholder="Your title is ..." value={this.state.title} onChange={this.handleTitleInput} required /> <br/></div> 
                                    :
                                    <div></div>
                                }
                                {this.state.book  && this.state.book.parameters.name ?  
                                    <div><label htmlFor="uname"><b>Your main name is: </b></label><input type="text" placeholder="Your main name is ..." value={this.state.name} onChange={this.handleNameInput} required /> <br/></div> 
                                    : 
                                    <div><input type="text" placeholder="There is no parametizable name in this book" disabled/> <br/></div> 
                                }
                                <label htmlFor="uname"><b>Your main place is: </b></label>
                                {this.state.book  && this.state.book.parameters.place ? 
                                    <div><input type="text" placeholder="Your place is ..." value={this.state.place} onChange={this.handlePlaceInput} required />  <br/></div> 
                                    : 
                                    <div><input type="text" placeholder="There is no parametizable name in this book" disabled/> <br/></div> 
                                }
                                <button className="btn btn-info" type="submit">Update Book!</button>    
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default EditBook;