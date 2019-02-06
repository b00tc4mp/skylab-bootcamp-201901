import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    
    render() {

        return (
            <section className="notfound">
                <div className="notfound__content">
                    <h2 className="notfound__title">Ups! Lo sentimos, pero esta página no está disponible</h2>
                    <img src="./images/ups.svg" className="notfound__image" alt="" />
                </div>
            </section>
        );
    }
}

export default NotFound;
