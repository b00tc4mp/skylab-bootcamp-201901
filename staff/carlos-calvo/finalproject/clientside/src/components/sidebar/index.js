import React, {Component, Fragment} from 'react'
import './index.sass'
class SideBar extends Component {

    render() {
        return (
            <Fragment>
                <div>
                    <div className="sidenav">
                        <a href="/home/newbook">New Book <i className="fas fa-plus-square"></i></a>
                        <a href="">Your Books <i className="fas fa-swatchbook"></i></a>
                        <a href="">Your Profile <i className="far fa-user"></i></a>
                        <a href="">Your Cart <i className="fas fa-shopping-cart"></i></a>
                        <a href="">Contact Us <i className="far fa-envelope"></i></a>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default SideBar;