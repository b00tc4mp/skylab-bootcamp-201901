import React, {Component, Fragment} from 'react'
import logic from '../../logic'
import { Route, withRouter } from 'react-router-dom'
import SideBar from '../SideBar'
import UpdateUser from '../UpdateUser'
import ContactForm from '../Contact'
import CreateBook from '../CreateBook';
import YourBooks from '../YourBooks'
import Books from '../Books';
class Home extends Component {
    state = { bookid: null }

    logoutUser = () => {
        logic.logOutUser()
        this.props.history.push('/welcome')
    }

    loadBook = (bookid) => {
        //Crear el array de Strings para páginas
        console.log('En el home el id', bookid)
        this.props.history.push(`/home/yourbooks/${bookid}`)
    }

    render() {
        return (
            <Fragment>
                <SideBar logoutUser = {this.logoutUser}></SideBar>
                <Route path="/home/newbook" component = {CreateBook} />
                <Route exact path="/home/yourbooks" render={() => <YourBooks loadBook={this.loadBook} /> }/>
                <Route path="/home/profile" component = {UpdateUser} />
                <Route path="/home/contact" component = {ContactForm} />
                <Route exact path="/home/yourbooks/:bookid" render={(props) => <Books bookid={props.match.params.bookid}/>}/>
            </Fragment>
        )
    }
}
export default withRouter(Home);