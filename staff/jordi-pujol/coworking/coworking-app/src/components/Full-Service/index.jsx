import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic';

class FullService extends Component {

    render() {

        const { props: { service: { title, description } } } = this
        console.log(this.props)
        return <section>
            <h3>HOLAAAAAAAAAAAAAAAAAAAAAA</h3>
            <h2>{title}</h2>
            <h2>{description}</h2>
        </section>
    }
}
export default withRouter(FullService)