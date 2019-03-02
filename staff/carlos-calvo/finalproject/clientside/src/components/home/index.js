import React, {Component, Fragment} from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
import SideBar from '../sidebar'
class Home extends Component {

    onGoToRoute = (name) =>{
        {this.props.history.push(name)}
    }

    render() {
        return (
            <Fragment>
                <SideBar></SideBar>
            </Fragment>
        )
    }
}
export default withRouter(Home);