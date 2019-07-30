import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem } from '@fortawesome/free-solid-svg-icons'
import './index.sass'

function Footer() {
    return <footer className="uk-margin-bottom uk-margin-medium-top uk-text-center">
        <Link className="footer__logo" to="/"><span>Diamond</span> <FontAwesomeIcon icon={faGem} className="footer__icon" size="2x"/> Auctions</Link>
    </footer>
        
}

export default Footer