import React, {Component, Fragment} from 'react'
import { Route, withRouter, Link } from 'react-router-dom'
class Home extends Component {

    render() {
        return (
            <Fragment>
                <h1>Página Home</h1>
            </Fragment>
        )
    }
}
export default withRouter(Home);