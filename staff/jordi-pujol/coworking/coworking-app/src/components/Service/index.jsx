import React, { Component } from 'react'

import logic from '../../logic'

class Service extends Component {

    state = { myservice: null, color: 'yellow' }

    componentWillMount() {
        const { props: { myservice } } = this

        this.setState({ myservice })

        const { props: { servicesFor: { active, user } } } = this

        if (!active) this.setState({ color: 'red' })

        else {
            return logic.retrieveUser()
                .then(({ name }) => {
                    if (name.toString() !== user.toString()) this.setState({ color: 'blue' })
                })
        }
    }

    componentWillReceiveProps() {
        const { props: { myservice } } = this

        this.setState({ myservice })
    }

    onServiceClick = id => {

        const { props: { onServiceSelected } } = this

        onServiceSelected(id)
    }

    render() {

        const { state: { myservice, color }, props: { servicesFor: { title, description, user, id, date } }, onServiceClick } = this

        let formatedDate = date.substring(0, 10) + ' ' + date.substring(11, 16)

        // + Math.round(Math.random()*2)

        return <section className={"service__" + color} onClick={() => onServiceClick(id)}>
            <h2 className="service__title">Service: {title}</h2 >
            <p className="service__item"><strong>Description:</strong> {description}</p>
            <p className="service__item"><strong>Upload date and time:</strong> {formatedDate}</p>
            {!myservice && <p className="service__item"><strong>Service provider:</strong> {user}</p>}
        </section >
    }
}

export default Service