import React, {Component, Fragment} from 'react'
import SideBar from '../SideBar'
import logic from '../../logic';
import CardBook from '../CardBook';
import './index.sass'

class YourBooks extends Component {

    state = {
        books: []
    }

    componentDidMount(){

        try {
            logic.retrieveBooks()
                .then((books) => {
                    this.setState({books})
                    console.log(books)
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <Fragment>
                <div>
                    <SideBar/>
                </div>
                <div className = "rightsidebar c_updateuser">
                    <div className="row justify-content-center">
                        {this.state.books.map(book =>{
                            return (<CardBook bookSelected={book} loadBook = {this.props.loadBook} />)
                            })}
                    </div>  
                </div>

            </Fragment>
        )
    }
}
export default YourBooks;