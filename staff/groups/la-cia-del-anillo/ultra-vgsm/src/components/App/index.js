import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';

import Aside from '../Aside'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <main className="app">
                    <Aside />
                    <div className="wrapper">
                        <header className="header header--mobile content">
                            <button className="header__button">
                                <i className="fas fa-bars" />
                            </button>
                            <a href="#home" title="Ultra-VGMS" className="logo">
                                <img
                                    src="./images/logo.png"
                                    alt="Ultra-VGMS Logo"
                                    className="logo__image"
                                />
                                Ultra-VGMS
                            </a>
                            <button className="header__button">
                                <i className="fas fa-search" />
                            </button>
                        </header>

                        <header className="header header--desktop content">
                            <form className="search">
                                <i className="fas fa-search" />
                                <input
                                    className="search__input"
                                    type="text"
                                    name="query"
                                    placeholder="Search..."
                                    autoComplete="off"
                                />
                            </form>
                        </header>

                        <div className="container">
                            <section className="results content">
                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/back/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/198-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>

                                <article className="card">
                                    <a href="#">
                                        <div>
                                            <img
                                                className="card__image"
                                                src="https://cdn.thegamesdb.net/images/original/boxart/front/161-1.jpg"
                                            />
                                        </div>
                                    </a>
                                    <header>
                                        <h3 className="card__title">
                                            <a
                                                href=""
                                                className="card__title-link"
                                                title="The Legend of Zelda: Ocarina of Time"
                                            >
                                                The Legend of Zelda: Ocarina of Time
                                            </a>
                                        </h3>
                                        <h4 className="card__platform">Nintendo 64</h4>
                                    </header>
                                </article>
                            </section>
                        </div>
                        <footer className="footer content">
                            <p>
                                Build with <i className="fas fa-heart footer__icon" /> by
                                <a href="" title="Github quinwacca" className="footer__link">
                                    quinwacca
                                </a>
                                +
                                <a href="" title="Github viabadia" className="footer__link">
                                    viabadia
                                </a>
                                +
                                <a href="" title="Github robert-z" className="footer__link">
                                    robert-z
                                </a>
                            </p>
                        </footer>
                    </div>
                </main>
            </BrowserRouter>
        );
    }
}

export default App;
