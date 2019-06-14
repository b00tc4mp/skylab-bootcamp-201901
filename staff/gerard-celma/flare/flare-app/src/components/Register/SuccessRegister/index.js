import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Success extends Component {

    componentDidMount() {
        setTimeout(() => this.props.history.push('/login'), 2000)
    }

    render() {
        return <section className="success">
            <p className="successIcon"><i class="far fa-check-circle fa-10x"></i></p>
            <p className="successText">SUCCESS</p>
        </section>
    }
}

export default withRouter(Success)