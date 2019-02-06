import React, { Component, Fragment } from 'react';

class LandingPage extends Component {
    render() {
        return (
            <section className="landing">
                <div className="landing__content">
                    <img src="./images/logo.png" className="landing__image" alt="" />
                    <h1 className="landing__title">Welcome to Ultra Video Games Search Machine!</h1>
                </div>
            </section>
        );
    }
}

export default LandingPage;
