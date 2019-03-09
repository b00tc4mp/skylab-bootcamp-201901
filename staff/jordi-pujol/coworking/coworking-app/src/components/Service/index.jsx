import React, { Component } from 'react'

class Service extends Component {

    onServiceClick = id => {
        
        const { props: { onServiceSelected } } = this

        onServiceSelected(id)
    }


    render() {

        const { props: { servicesFor }, onServiceClick } = this

        return <section onClick={() => onServiceClick(servicesFor.id)}>
            <h2>Title: {servicesFor.title}</h2 >
            <p>Descrition: {servicesFor.description}</p>
        </section >
    }
}

export default Service