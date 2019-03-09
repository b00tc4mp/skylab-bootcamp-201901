import React, {Component, Fragment} from 'react'
import logic from '../../logic';
import CardTemplate from '../CardTemplate'
import './index.sass'

class TemplateBooks extends Component {

    state = {
        books: [],
        editBookVisible: false,
        toastId: null
    }

    deleteBook = (id) => {
        return logic.deleteBook(id)
        .then(()=> {
            this.notify()
            this.retrieveYourBooks()
        })
    }



    retrieveTemplateBooks = () =>{
        try {
            logic.retrieveTemplateBooks()
                .then((books) => {
                    return this.setState({books}, () => {})
            })
        } catch (error) {
            console.log(error)
        }
    }


    componentDidMount(){
        this.retrieveTemplateBooks()
    }

    render() {

        const {state : { books} } = this
        return (
            <Fragment>
                <div className = "coverright">
                    <div className="row justify-content-center">
                        {books.length && books.map(book =>{
                            return (<CardTemplate bookSelected={book} />)
                            })}
                    </div>  
                </div>
            </Fragment>
        )
    }
}
export default TemplateBooks;