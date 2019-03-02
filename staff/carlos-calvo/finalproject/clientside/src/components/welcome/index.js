import React, {Component, Fragment} from 'react'
import Carrousel from '../carrousel'
import { Route, withRouter, Link } from 'react-router-dom'
import './index.sass'

class Welcome extends Component {

    goToRoute = (name) => {
        this.props.history.push(name)
    }

    render() {
        return (
            
        <Fragment>
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light navigation">
                <a href="#" className="btn btn-info btn-lg">
                <img width = "35px" height="35px" src="https://www.misskatecuttables.com/uploads/shopping_cart/9363/large_books-on-shelf.png"></img>
                <span className="glyphicon glyphicon-book"></span> Your Book Creator
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Create Book</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="navbarDropdown" role="button" aria-expanded="false">
                            Your books
                            </a>
                        </li> */}

                        <li className="nav-item">
                            <button className="nav-link" onClick ={ event => {event.preventDefault(); return this.goToRoute('/register')}} id="navbarDropdownMenuLink" aria-haspopup="true" aria-expanded="false">
                            New? Register!
                            </button>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link" onClick ={ event => {event.preventDefault(); return this.goToRoute('/login') }} id="navbarDropdownMenuLink">
                            Personal Area
                            </button>
                        </li>
                    </ul>
                </div>
                </nav>
            </Fragment>
            <div className="Carrouselcontainer">
                <Carrousel/>
            </div>
        </Fragment>)
    }
}
export default withRouter(Welcome);