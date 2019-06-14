import React from 'react'
import './index.sass'


function Footer() {
    return <footer className="footer">
            <div className="footer__title">
            <h2 className="footer__title-time">Time</h2>
            <h2 className="footer__title-to">T</h2> 
            <i className="footer__title-clock fas fa-clock"></i>
            </div>
        <div className="footer__logo">
        <i className="fab fa-instagram fa-2x"></i>
        <i className="fab fa-twitter fa-2x"></i>
        <i className="fab fa-facebook fa-2x"></i>
        </div>
        <p className="footer__copy">&copy; 2019 TimeTo by Tachi </p>
    </footer>
}

export default Footer