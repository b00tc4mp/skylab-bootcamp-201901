import React from 'react'
import './index.sass'

class Feedback extends React.Component {

    onGoBackSearch =()=>{
        this.props.goBackSearch()
    }


    render() {

        return <section className="feedback">
            <div className="feedback__box container pl-md-5 pr-md-5 mt-3">
                <h3>Error</h3>

                <p className="error message">{this.props.message}</p>
                <button className="btn btn-dark inline feedback" onClick={this.onGoBackSearch}>Return to search</button>
            </div>


        </section>

    }
}

export default Feedback