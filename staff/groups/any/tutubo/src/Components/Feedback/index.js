import React, {Component} from 'react'

class Feedback extends Component {

    render(){
        const { props: {message}} = this

        return <section>
            <p>{message}</p>
        </section>
    }
}

export default Feedback