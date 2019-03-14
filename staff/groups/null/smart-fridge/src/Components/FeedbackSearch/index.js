import React from 'react'
import './index.sass'

class FeedbackSearch extends React.Component {

    handleOnGoBackSearch =event=>{
        event.preventDefault()
        this.props.goBackSearch()
    }


    render() {

       return <section className="feedbackSearc">
            <div className="feedbackSearch__box mt-5 ml-5 mr-5">
                <h3 className="feedbackSearch__title mt-3">Error</h3>
                <p className="error feedbackSearch__message font-weight-bold">{this.props.message}</p>
                <button className="btn btn-dark inline mb-3"  onClick={this.handleOnGoBackSearch}>Return to search</button>
            </div>
        </section>

    }
}

export default FeedbackSearch