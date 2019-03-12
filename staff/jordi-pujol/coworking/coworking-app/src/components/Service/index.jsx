import React, { Component } from 'react'

class Service extends Component {

    state = {myservice: null}

    componentWillMount(){
        const {props: {myservice}} = this
        
        this.setState({myservice})
    }

    componentWillReceiveProps(){
        const {props: {myservice}} = this
        
        this.setState({myservice})
    }

    onServiceClick = id => {
        
        const { props: { onServiceSelected } } = this

        onServiceSelected(id)
    }


    render() {

        const { state: {myservice} ,props: { servicesFor: {title, description, user, id, date} }, onServiceClick } = this

        let formatedDate = date.substring(0, 10) + ' ' + date.substring(11, 16)

        return <section className="service" onClick={() => onServiceClick(id)}>
            <h2 className="service__title">Title: {title}</h2 >
            <p className="service__description">Description: {description}</p>
            <p className="service__description">Upload date and time: {formatedDate}</p>
            { !myservice && <p className="service__description">Service provider: {user}</p>}
        </section >
    }
}

export default Service