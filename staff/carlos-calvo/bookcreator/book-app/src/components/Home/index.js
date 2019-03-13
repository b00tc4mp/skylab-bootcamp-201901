import React, {Component, Fragment} from 'react'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'
import SideBar from '../SideBar'
import UpdateUser from '../UpdateUser'
import ContactForm from '../Contact'
import CreateBook from '../CreateBook';
import YourBooks from '../YourBooks'
import Books from '../Books';
import EditBook from '../EditBook'
import TemplateBooks from '../TemplateBooks'
import { ToastContainer, toast } from 'react-toastify';
import './index.sass'


class Home extends Component {
    state = { bookid: null }

    logoutUser = () => {
        logic.logOutUser()
        this.props.history.push('/')
    }

    loadBook = (bookid) => {
        this.props.history.push(`/home/yourbooks/${bookid}`)
    }

    loadTemplateBook = (templateid) => {
        this.props.history.push(`/home/templates/${templateid}`)
    }

    editBook = (bookid) => {
        this.props.history.push(`/home/editbook/${bookid}`)
    }

    render() {
        return (
            <div className="bodycontainer">
                <SideBar logoutUser = {this.logoutUser}></SideBar>
                <Route path="/home/newbook" component = {CreateBook} />
                <Route exact path="/home/yourbooks" render={() => <YourBooks loadBook={this.loadBook} editBook={this.editBook}/> }/>
                <Route path="/home/templatebooks" render={() => <TemplateBooks loadTemplateBook = {this.loadTemplateBook}/>} />
                <Route path="/home/profile" component = {UpdateUser} />
                <Route path="/home/contact" component = {ContactForm} />
                <Route path="/home/editbook/:bookid" render={(props) => <EditBook bookid={props.match.params.bookid}/>} />
                <Route exact path="/home/yourbooks/:bookid" render={(props) => <Books bookid={props.match.params.bookid}/>}/>
                <Route exact path="/home/templates/:templateid" render={(props) => <Books templateid={props.match.params.templateid}/>}/>
            </div>
        )
    }
}
export default withRouter(Home);