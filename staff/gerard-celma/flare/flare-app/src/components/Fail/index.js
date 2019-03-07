import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Fail extends Component {

    componentDidMount() {
        setInterval(() => this.props.history.push('/home'), 3000)
    }

    render() {
        return <section className="fail">
            <p>Fail!!!!!!!!</p>
        </section>
    }
}

export default withRouter(Fail)