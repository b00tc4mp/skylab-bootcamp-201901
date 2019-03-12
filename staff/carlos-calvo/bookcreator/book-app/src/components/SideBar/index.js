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
                    <div className="sidenav bg-info">
                        <Link className="sidenav-text" to="/home/newbook">New Book <i className="fas fa-plus-square"></i></Link>
                        <Link className="sidenav-text" to="/home/yourbooks">Your Books <i className="fas fa-swatchbook"></i></Link>
                        <Link className="sidenav-text" to="/home/templatebooks">Templates <i class="fas fa-hat-wizard"></i></Link>
                        <Link className="sidenav-text" to="/home/profile">Your Profile <i className="far fa-user"></i></Link>
                        <Link className="sidenav-text" to="/home/contact">Contact Us <i className="far fa-envelope"></i></Link>
                        <Link className="sidenav-text" to ="/welcome" onClick={this.logoutUser}>LogOut <i className="fas fa-sign-out-alt"></i></Link>
                    </div>
            </Fragment>
        )
    }
}
export default SideBar;