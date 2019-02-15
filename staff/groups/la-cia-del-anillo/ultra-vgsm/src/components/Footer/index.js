import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="footer content">
                <p>
                    Build with <i className="fas fa-heart footer__icon" /> by {' '}<a href="https://github.com/quinwacca" title="Github quinwacca" className="footer__link">
                        quinwacca
                    </a>,{' '}
                    <a href="https://github.com/viabadia" title="Github viabadia" className="footer__link">
                        viabadia
                    </a>,{' & '}
                    <a href="https://github.com/robert-z/" title="Github robert-z" className="footer__link">
                        robert-z
                    </a>
                </p>
            </footer>
        );
    }
}

export default Footer;
