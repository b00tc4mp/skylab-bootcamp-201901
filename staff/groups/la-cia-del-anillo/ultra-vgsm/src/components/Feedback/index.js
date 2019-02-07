import React, { Component } from 'react';
import './index.css';

class Feedback extends Component {
    state = {message: null}

    componentWillMount = () => {
        const {props: {message} } = this;
        this.setState({
            message
        });
    }

    componentWillReceiveProps(nexProps) {
        console.log(nexProps);
        this.setState({
            message: nexProps.message
        });
    }

    toggleFeedback = () => {
        this.props.toggleFeedback(null);
    };

    render() {
        const {
            toggleFeedback,
            state: { message }
        } = this;

        return (
            message && (
                <section className="feedback">
                    {message}
                    <span className="feedback__close" onClick={() => toggleFeedback()}>
                        <i className="fas fa-times" />
                    </span>
                </section>
            )
        );
    }
}

export default Feedback;
