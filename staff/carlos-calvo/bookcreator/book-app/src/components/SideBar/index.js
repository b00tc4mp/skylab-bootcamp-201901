import React, {Component, Fragment} from 'react'
import { Link, withRouter  } from "react-router-dom";
import logic from '../../logic'
import './index.sass'
class SideBar extends Component {

    logoutUser =() => {
        this.props.logoutUser()
    }

    render() {
        return (
            <Fragment>
                    <ul className="sidenav">
                        <li><img width = "35px" height="35px" src="https://www.misskatecuttables.com/uploads/shopping_cart/9363/large_books-on-shelf.png"></img></li>
                        <li><Link className="sidenav__text" to="/home/newbook">New Book <i className="fas fa-plus-square"></i></Link></li>
                        <li><Link className="sidenav__text" to="/home/yourbooks">Your Books <i className="fas fa-swatchbook"></i></Link></li>
                        <li><Link className="sidenav__text" to="/home/templatebooks">Templates <i class="fas fa-hat-wizard"></i></Link></li>
                        <li><Link className="sidenav__text" to="/home/profile">Your Profile <i className="far fa-user"></i></Link></li>
                        <li><Link className="sidenav__text" to="/home/contact">Contact Us <i className="far fa-envelope"></i></Link></li>
                        <li><Link className="sidenav__text" to ="/welcome" onClick={this.logoutUser}>LogOut <i className="fas fa-sign-out-alt"></i></Link></li>
                        <li><a className="sidenav__icon" onclick="myFunction()">
                            <i class="fa fa-bars"></i>
                        </a></li>
                    </ul>
            </Fragment>
        )
    }
}
export default SideBar;