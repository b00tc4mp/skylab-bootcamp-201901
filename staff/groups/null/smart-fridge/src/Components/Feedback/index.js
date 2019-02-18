import React from 'react'
import './index.sass'

class Feedback extends React.Component {

    handleOnGoBackSearch =event=>{
        event.preventDefault()
        this.props.goBackSearch()
    }


    render() {

       return <section className="feedback">
            <div className="feedback__box mt-2 ml-5 mr-5">
                <p className="error feedback__message font-weight-bold text-center">{this.props.message}</p>
            </div>
        </section>

    }
}

export default Feedback