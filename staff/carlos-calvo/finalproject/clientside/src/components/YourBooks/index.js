import React, {Component, Fragment} from 'react'
import SideBar from '../SideBar'
import logic from '../../logic';
import CardBook from '../CardBook';
import './index.sass'

class YourBooks extends Component {

    state = {
        books: [],
        rerender: true
    }

    deleteBook = (id) => {
        return logic.deleteBook(id)
        .then(()=> {
            this.retrieveYourBooks()})
    }

    retrieveYourBooks(){
        try {
            logic.retrieveBooks()
                .then((books) => {
                    this.setState({books})
            })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount(){
        this.retrieveYourBooks()
    }

    render() {
        return (
            <Fragment>
                <div>
                    <SideBar/>
                </div>
                <div className = "coverright">
                    <div className="row justify-content-center">
                        {this.state.books.map(book =>{
                            return (<CardBook bookSelected={book} deleteBook = {this.deleteBook} loadBook = {this.props.loadBook} />)
                            })}
                    </div>  
                </div>

            </Fragment>
        )
    }
}
export default YourBooks;