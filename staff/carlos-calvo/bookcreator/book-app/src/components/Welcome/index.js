import React, {Component, Fragment} from 'react'
import Carrousel from '../Carrousel'
import { withRouter, Link } from 'react-router-dom'
import './index.sass'

class Welcome extends Component {


    state= {checked: false}

    componentDidMount() {
        this.props.history.listen(() => this.setState({checked: false}))
    }

    toggle  = () => this.setState({checked: !this.state.checked})

    render() {
        return ( 
        <Fragment>
            <Fragment> {/*navbar*/}
                <div className="welcomesidenav">
                    <a href="#">
                        <img className="logo_name"width = "35px" height="35px" src="https://www.misskatecuttables.com/uploads/shopping_cart/9363/large_books-on-shelf.png"></img>
                        <span className="glyphicon glyphicon-book">Your Book Creator</span> 
                    </a>
                    <label htmlFor="toggle">&#9776;</label>
                    <input type="checkbox" id="toggle" onChange={this.toggle} checked={this.state.checked}/>
                    <div className="welcomesidenav__menu">
                        <Link to="/register">New? Register <i className="fas fa-user-plus"></i></Link>
                        <Link to="/login">Personal Area<i className="fas fa-users"></i></Link>
                    </div>
                </div>
            </Fragment>
                <div className="ContainerWelcome"> {/*Container*/}
                    <div className="ContainerWelcome-carrousel"> {/*First Line*/}
                        <Carrousel/>
                    </div>
                </div>
                <footer>
                    <div> Created and designed by <b>Carlos Calvo Lopez</b> for <a href="http://creativezoo.pro/">Creative Zoo</a></div>
                    <div><a href="https://github.com/carlosclatg/skylab-bootcamp-201901/blob/feature/finalproject/staff/carlos-calvo/bookcreator/book-creator-doc/README.md"><i className="fab fa-github-square fa-lg"></i></a></div>
                </footer>
        </Fragment>)
    }
}
export default withRouter(Welcome);
