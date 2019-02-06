import React, { Component } from 'react'
import logic from "../../logic";



export default ChildComponent => {

    class ComposedCompoent extends Component {

        state = {auth: logic.getUserApiToken()}

        componentDidMount() {
            this.shouldNavigateAway()
        }

        componentDidUpdate() {
            this.shouldNavigateAway()
        }

        shouldNavigateAway() {
            if (!this.state.auth) this.props.history.push('/')
        }

        renderChilds() {
            if (this.state.auth) return <ChildComponent {...this.props} />
            return null
        }

        render() {
            return <div> {this.renderChilds()} </div>
        }

    }

    return ComposedCompoent

}