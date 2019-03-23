import React, {Component, Fragment} from 'react'
import CardTemplate from '../CardTemplate'
import './index.sass'
import { toast } from 'react-toastify';
import logic from '../../logic'

class TemplateBooks extends Component {

    state = {
        books: [],
        editBookVisible: false,
        toastId: null,
        searchText: ''
    }
    handleSearch = event => {
        this.setState({
          searchText: event.target.value
        });
    }
    loadTemplateBook = (id) => {
        this.props.loadTemplateBook(id)
    }

    update = () =>{
        this.forceUpdate()
    }

    retrieveTemplateBooks = () =>{
        try {
            logic.retrieveTemplateBooks()
                .then((books) => {
                    this.setState({books}, () => {})})
                .catch(error => this.notify()) 
        } catch (error) {
            this.notify()
        }
    }

    notify = (error) => {
        error ? 
        toast.warn("There was something wrong...", {
            position: toast.POSITION.BOTTOM_LEFT,
          })
          :
        console.log()
    }


    componentDidMount =() => {
        this.retrieveTemplateBooks()
    }

    render = () => {
        //Filtering by search
        const {state : { books } } = this
        let booksfiltered = books.filter(book => { 
                                if(this.state.search = '') return true
                                else {
                                    let lowerCasetitle = book.title.toLowerCase()
                                    return lowerCasetitle.includes(this.state.searchText.toLowerCase())
                                }})
        return (
            <Fragment>
                <div className = "coverright">
                <h2 className="letter">Public Templates</h2>
                <form> 
                    <div className="container-inputSearch">
                        <input className="inputSearch" type="text" name="search" placeholder="Search.." onChange={this.handleSearch}/>
                    </div>
                </form>

                    {booksfiltered && booksfiltered.length?
                    <div className="cardContainer">
                        
                            {booksfiltered.length && booksfiltered.map(book =>{
                                return (<CardTemplate bookSelected={book} loadTemplateBook={this.loadTemplateBook} update={this.update} />)
                            })}
                            {!booksfiltered.length?
                                <div>Ooops no books matching criteria</div>
                                :
                                null
                            }
                    </div> 
                    :
                    <div className="cardContainer"><b>Ooops no books matching criteria</b></div>
                }        
                </div>
            </Fragment>
        )
    }
}
export default TemplateBooks;