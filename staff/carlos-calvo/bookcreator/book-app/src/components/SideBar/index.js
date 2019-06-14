import React, {Component, Fragment} from 'react'
import { Link, withRouter  } from "react-router-dom";
import logic from '../../logic'
import './index.sass'
class SideBar extends Component {

    state= {checked: false}

    logoutUser =() => {
        this.props.logoutUser()
    }

    componentDidMount() {
        this.props.history.listen(() => this.setState({checked: false}))
    }

    toggle  = () => this.setState({checked: !this.state.checked})

    render() {
        return (
            <Fragment>
                        <div className="sidenav">
                            <label htmlFor="toggle">&#9776;</label>
                            <input type="checkbox" id="toggle" onChange={this.toggle} checked={this.state.checked}/>
                            <div className="sidenav__menu">
                                <img width = "30px" height="30px" src="https://www.misskatecuttables.com/uploads/shopping_cart/9363/large_books-on-shelf.png"></img>
                                <Link className="sidenav__text" to="/home/newbook">New Book <i className="fas fa-plus-square"></i></Link>
                                <Link className="sidenav__text" to="/home/yourbooks">Your Books <i className="fas fa-swatchbook"></i></Link>
                                <Link className="sidenav__text" to="/home/templatebooks">Templates <i className="fas fa-hat-wizard"></i></Link>
                                <Link className="sidenav__text" to="/home/profile">Your Profile <i className="far fa-user"></i></Link>
                                <Link className="sidenav__text" to="/home/contact">Contact Us <i className="far fa-envelope"></i></Link>
                                <Link className="sidenav__text" to ="/welcome" onClick={this.logoutUser}> <span>LogOut</span> <i className="fas fa-sign-out-alt"></i></Link>
                            </div>
                        </div>
            </Fragment>
        )
    }
}
export default withRouter(SideBar);