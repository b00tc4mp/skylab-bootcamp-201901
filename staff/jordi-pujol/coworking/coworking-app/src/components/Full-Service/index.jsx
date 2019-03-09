import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic';

class FullService extends Component {

    state = {activeService:''}

    // handleSubmitForm = event => {
    //     event.preventDefault()

    //     const { props: { onServiceSubmit, id } } = this
    //     onServiceSubmit(id)
    // }

    componentDidMount () {

        const {props: {service}} = this

        return logic.retrieveService(service)
            .then(service => this.setState({ activeService: service }))
    }

    static getDerivedStateFromProps(props, state) {

        if (props.service !== state.activeService)
            return {
                service: props.service
            }
        return null
    }

    componentDidUpdate(prevProps) {

        const { props: { service } } = this
        
        if (service !== prevProps.service)
            return logic.retrieveService(service)
                .then(service=> this.setState({activeService: service}))
    }


    handleSubmitForm = event=> {
        event.preventDefault()

        const {state: {activeService: {id}} }= this

        return logic.addUserToService(id)
            .then(() => this.props.history.push('/home/inbox'))
    }

    render() {

        const { state: { activeService: { title, description } }, handleSubmitForm } = this
        
        return <section>
            <h3>HOLAAAAAAAAAAAAAAAAAAAAAA</h3>
            <h2>{title}</h2>
            <h2>{description}</h2>
            <form onSubmit={handleSubmitForm}>
                <button>Submit to this Service</button>
            </form>
        </section>
    }
}
export default withRouter(FullService)