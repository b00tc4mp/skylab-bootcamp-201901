import React, {Component, Fragment} from 'react'
import Carrousel from '../Carrousel'
import { withRouter, Link } from 'react-router-dom'
import './index.sass'

class Welcome extends Component {


    componentDidMount(){

    }

    goToRoute = (name) => {
        this.props.history.push(name)
    }

    render() {
        return ( 
        <Fragment>
            <Fragment> {/*navbar*/}
                <nav className="navbar navbar-expand-lg navigation fixed-top">
                <a href="#" className="btn btn-info btn-lg">
                <img className="logo_name"width = "35px" height="35px" src="https://www.misskatecuttables.com/uploads/shopping_cart/9363/large_books-on-shelf.png"></img>
                <span className="glyphicon glyphicon-book"></span> Your Book Creator
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="row navbar-nav mr-auto">
                        <li className="nav-item col-5">
                            <Link to="/register">New? Register <i className="fas fa-user-plus"></i></Link>
                        </li>
                        <li className="nav-item col-5">
                            <Link to="/login">Personal Area<i className="fas fa-users"></i></Link>
                        </li>
                    </ul>
                </div>
                </nav>
            </Fragment>
                <div className="headertitle">Book Creator and Sharing!</div>
                <div className="ContainerWelcome"> {/*Container*/}
                    <div className="ContainerWelcome-carrousel"> {/*First Line*/}
                        <Carrousel/>
                    </div>
                </div>
                <footer>
                    <div> Created and designed by Carlos Calvo for Creative Zoo</div>
                    <div><a href="https://github.com/carlosclatg/skylab-bootcamp-201901"><i class="fab fa-github-square fa-lg"></i></a></div>
                </footer>
        </Fragment>)
    }
}
export default withRouter(Welcome);