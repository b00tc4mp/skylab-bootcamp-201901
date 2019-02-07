import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <footer className="footer content">
                <p>
                    Build with <i className="fas fa-heart footer__icon" /> by <a href="https://github.com/quinwacca" target="_blank" title="Github quinwacca" className="footer__link">
                        quinwacca
                    </a>, 
                    <a href="https://github.com/viabadia" target="_blank" title="Github viabadia" className="footer__link">
                        viabadia
                    </a>, 
                    <a href="https://github.com/robert-z/" target="_blank" title="Github robert-z" className="footer__link">
                        robert-z
                    </a>
                </p>
            </footer>
        );
    }
}

export default Footer;
