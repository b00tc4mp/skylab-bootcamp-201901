import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Success extends Component {

    componentDidMount() {
        setTimeout(() => this.props.history.push('/home'), 2000)
    }

    render() {
        return <section className="success">
            <p><i class="far fa-check-circle fa-10x"></i></p>
        </section>
    }
}

export default withRouter(Success)