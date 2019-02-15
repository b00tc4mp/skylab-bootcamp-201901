import React, { Component } from 'react';

class NotFound extends Component {
    
    render() {

        return (
            <section className="notfound">
                <div className="notfound__content">
                    <h2 className="notfound__title">Ups! We're sorry, but this page is not available.</h2>
                    <img src="./images/ups.svg" className="notfound__image" alt="" />
                </div>
            </section>
        );
    }
}

export default NotFound;
