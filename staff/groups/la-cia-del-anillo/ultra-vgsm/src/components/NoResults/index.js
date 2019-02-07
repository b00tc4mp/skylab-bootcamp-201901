import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoResults extends Component {
    render() {
        return (
            <section className="notfound">
                <div className="notfound__content">
                    <h2 className="notfound__title">
                        Ups! Parece que aquí no hay nada... Revisa que el nombre esté bien escrito o
                        realiza otra busqueda
                    </h2>
                    <img src="./images/ups.svg" className="notfound__image" alt="" />
                </div>
            </section>
        );
    }
}

export default NoResults;
