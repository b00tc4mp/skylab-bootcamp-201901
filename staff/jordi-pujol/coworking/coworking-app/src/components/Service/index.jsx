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

        const { state: { myservice, color }, props: { servicesFor: { title, description, user, userName, id, date } }, onServiceClick } = this

        let formatedDate = date.substring(0, 10) + ' ' + date.substring(11, 16)

        return <section className={"service__" + color}>
            <h2 className="service__title" onClick={() => onServiceClick(id)}>Service: {title}</h2 >
            <p className="service__item"><strong>Description:</strong> {description}</p>
            <p className="service__item"><strong>Upload date and time:</strong> {formatedDate}</p>
            {!myservice && <p className="service__item"><strong>Service provider:</strong> {user}</p>}
            {!myservice && <a href={`#/home/inbox/profile/${userName}`} className="service__username"><strong>UserName:</strong> {userName}</a>}
        </section >
    }
}

export default Service