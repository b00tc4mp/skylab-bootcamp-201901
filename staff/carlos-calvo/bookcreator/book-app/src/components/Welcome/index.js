import React, {Component, Fragment} from 'react'
import Carrousel from '../Carrousel'
import { withRouter, Link } from 'react-router-dom'
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
                    <ul className="row navbar-nav mr-auto">
                        <li className="nav-item col-5">
                            <Link to="/register">New? Register <i class="fas fa-user-plus"></i></Link>
                        </li>
                        <div className="nav-item col-2"></div>
                        <li className="nav-item col-5">
                            <Link to="/login">Personal Area<i class="fas fa-users"></i></Link>
                        </li>
                    </ul>
                </div>
                </nav>
            </Fragment>
                <div>Book Creator and Sharing!
                </div>
            <div className="ContainerWelcome">
                <div className="ContainerWelcome-carrousel">
                    <Carrousel/>
                </div>
                <div>
                    Lorem IPsum
                </div>
            </div>
        </Fragment>)
    }
}
export default withRouter(Welcome);