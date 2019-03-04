import React, {Component, Fragment} from 'react'
import logic from '../../logic'
import { Route, withRouter, Link, Redirect } from 'react-router-dom'
import SideBar from '../sidebar'
import Books from '../books'
import UpdateUser from '../updateuser'
import ContactForm from '../contact'
import CreateBook from '../createBook';
class Home extends Component {

    // logoutUser = () => {
    //     logic.logOutUser()
    //     this.props.history.push('/welcome')
    // }
    render() {
        return (
            <Fragment>
                <SideBar logoutUser = {this.logoutUser}></SideBar>
                <Route path="/home/newbook" component = {CreateBook} />
                <Route path="/home/yourbooks" component = {Books} />
                <Route path="/home/profile" component = {UpdateUser} />
                <Route path="/home/contact" component = {ContactForm} />
            </Fragment>
        )
    }
}
export default Home;