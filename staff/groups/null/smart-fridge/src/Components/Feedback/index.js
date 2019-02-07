import React from 'react'
import './index.sass'

class Feedback extends React.Component {

    render() {

        return <section className="feedback">
            <div className="feedback__box mt-5 ml-5 mr-5">
                <h3 className="feedback__title mt-3">Error</h3>

                <p className="error feedback__message font-weight-bold">{this.props.message}</p>
                <button className="btn btn-dark inline mb-3" onClick={this.onGoBackSearch}>Return to search</button>
            </div>

        </section>

    }
}

export default Feedback