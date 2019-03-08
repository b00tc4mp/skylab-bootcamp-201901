import React, { Component, Fragment } from 'react'
import auth from '../../../services/auth';

export default ChildComponent => {

    class ComposedCompoent extends Component {

        componentDidMount() {
            this.shouldNavigateAway()
        }

        componentDidUpdate() {
            this.shouldNavigateAway()
        }

        shouldNavigateAway() {
            if (auth.isUserLoggedIn) this.props.history.push('/home')
        }

        renderChilds() {
            return (!auth.isUserLoggedIn) ? <ChildComponent {...this.props} /> : null
        }

        render() {
            return <Fragment>{this.renderChilds()}</Fragment>
        }

    }

    return ComposedCompoent

}