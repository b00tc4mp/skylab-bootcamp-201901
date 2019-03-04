import React, {Component, Fragment} from 'react'
import { Link  } from "react-router-dom";

import './index.sass'
class SideBar extends Component {

    // logoutUser(){
    //     this.props.logoutUser();
    // }

    render() {
        return (
            <Fragment>
                <div>
                    <div className="sidenav">
                        <Link to="/home/newbook">New Book <i className="fas fa-plus-square"/></Link>
                        <Link to="/home/yourbooks">Your Books <i className="fas fa-swatchbook"/></Link>
                        <Link to="/home/profile">Your Profile <i className="far fa-user"></i></Link>
                        <Link to="/home/contact">Contact Us <i className="far fa-envelope"></i></Link>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default SideBar;