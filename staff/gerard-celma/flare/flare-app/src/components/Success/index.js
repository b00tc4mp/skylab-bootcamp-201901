import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Success extends Component {

    componentDidMount() {
        setTimeout(() => this.props.history.push('/home'), 2000)
    }

    render() {
        return <section className="success">
            <p>Success!!!!!!!!</p>
        </section>
    }
}

export default withRouter(Success)