import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './index.css';
import Aside from '../Aside';
import Games from '../Games';

class App extends Component {
    render() {
        return (
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

                    <Route path="/games/:platformId" component={Games} />

                    <footer className="footer content">
                        <p>
                            Build with <i className="fas fa-heart footer__icon" /> by
                            <a href="" title="Github quinwacca" className="footer__link">
                                quinwacca
                            </a>
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

        );
    }
}

export default App;
