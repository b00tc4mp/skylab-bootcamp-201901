import React, {Component} from 'react'
import './index.sass'

class Feedback extends Component {

    render(){
        const { props: {message}} = this

        return <section className="notification is-warning feedback">
            <p>{message}</p>
        </section>
    }
}

export default Feedback