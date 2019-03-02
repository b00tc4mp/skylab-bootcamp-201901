import React, {Component, Fragment} from 'react'
import './index.sass'
class SideBar extends Component {

    render() {
        return (
            <Fragment>
                <div>
                    <div class="sidenav">
                        <a href="">New Book <i class="fas fa-plus-square"></i></a>
                        <a href="">Your Books <i class="fas fa-swatchbook"></i></a>
                        <a href="">Your Profile <i class="far fa-user"></i></a>
                        <a href="">Your Cart <i class="fas fa-shopping-cart"></i></a>
                        <a href="">Contact Us <i class="far fa-envelope"></i></a>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default SideBar;