import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoResults extends Component {
    render() {
        return (
            <section className="notfound">
                <div className="notfound__content">
                    <h2 className="notfound__title">
                        Ups! It seems that there is nothing here... Check that everything is well
                        written or perform another search
                    </h2>
                    <img src="./images/ups.svg" className="notfound__image" alt="" />
                </div>
            </section>
        );
    }
}

export default NoResults;
