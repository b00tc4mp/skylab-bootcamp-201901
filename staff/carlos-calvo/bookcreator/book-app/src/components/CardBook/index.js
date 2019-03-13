import React, {Component, Fragment} from 'react'
import './index.sass'
import logic from '../../logic'


class CardBook extends Component {

    loadBook = () => {
        this.props.loadBook(this.props.bookSelected._id)
    }

    deleteBook = () =>{
        this.props.deleteBook(this.props.bookSelected._id)
    }

    editBook = () =>{
        this.props.editBook(this.props.bookSelected._id)
    }

    addBookToTemplates = () =>{
        this.props.addBookToTemplates(this.props.bookSelected._id, this.props.bookSelected.isTemplate)
    }

    downloadEpubfase1 = (event) =>{
        event.preventDefault()
        try{
            logic.downloadEpub(this.props.bookSelected._id)
                .then(res => res.blob())
                .then(blob => {})
        } catch (error){
            console.log(error)
        }
    }

    downloadEpubfase2 = (event) => {
        event.preventDefault()
        try{
            logic.downloadEpub(this.props.bookSelected._id)
                .then(res => res.blob())
                .then(blob => {
                    // const contentDisposition = res.headers.get('Content-Disposition')
                    // const fileName = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition)[1]
                    // TODO improve using refs?
                    const url = window.URL.createObjectURL(blob)
                    const fileName = this.props.bookSelected.title
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', fileName)
                    document.body.appendChild(link)
                    link.click()
                })
        } catch (error){
            console.log(error)
        }
    }

    render() {

        const book = this.props.bookSelected
        console.log(book.coverphoto)
        return (
            <Fragment>
                <div className="bookCard" >
                    <div className="bookCard__photocontainer">
                        <img className="imagen" src={book.coverphoto}/>
                    </div>
                    <div className="cardBody">
                        <div className="cardBody__title" data-toggle="tooltip" data-placement="top" title={book.title}>
                            <p className="title">{book.title}</p>
                        </div>
                        <div className="cardBody__name">
                            {book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('name')? 
                            <p className="cardBody__text"><i className="fas fa-user-circle"></i> {book.parameters.name}</p>:
                            <p className="cardBody__text"><i className="fas fa-user-circle"></i> No editable name</p>
                            }
                        </div>
                        <div className="cardBody__place">
                            {book.hasOwnProperty('parameters') && book.parameters.hasOwnProperty('place') ? 
                            <p className="cardBody__text"><i class="fas fa-place-of-worship"></i> {book.parameters.place}</p>
                                :
                            <p className="cardBody__text"><i class="fas fa-place-of-worship"></i> No editable place</p>
                            }
                        </div>
                        <div className="cardBody__buttonContainer">
                            <button onClick={this.loadBook} className="butt butt--read" data-toggle="tooltip" data-placement="top" title="Read Book"><i className="fas fa-book-reader"></i></button>
                            <button onClick={this.editBook} className="butt butt--edit" data-toggle="tooltip" data-placement="top" title="Edit Book"><i className="fas fa-edit"></i></button>
                            <button onClick={this.deleteBook} className="butt butt--delete" data-toggle="tooltip" data-placement="top" title="Delete Book"><i className="fas fa-trash-alt"></i></button>
                            {book.hasOwnProperty('isTemplate') && !book.isTemplate? 
                            <button onClick={this.addBookToTemplates} className="butt butt--addtemplate" data-toggle="tooltip" data-placement="top" title="Publish Book"><i class="fas fa-share"></i></button>
                            :
                            <button onClick={this.addBookToTemplates} className="butt butt--addtemplate" data-toggle="tooltip" data-placement="top" title="This book is already a template" disabled><i class="fas fa-share"></i></button>
                            }
                            {/* <button className="butt--gener" onClick={this.downloadEpubfase1}>gen</button> */}
                            <button onClick={this.downloadEpubfase2} className="butt butt--download" data-toggle="tooltip" data-placement="top" title="Download Epub"><i class="fas fa-file-download" download></i></button>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default CardBook;