import React, { Component } from 'react'
import './index.sass'


class Footer extends Component {


    render(){

    return <footer className='footer'>
        <div className='footer__information'>
            <div>stjamesvet@stjamesvet.com  Phone: 01792 205000</div>
            <div className="footer__address">London Road 257</div>
            <div className="footer__emergency">Emergency number: 01792 205017</div>
            <div className='footer__copyright'>CopyRight 2019 Ⓒ All Roights Reserved </div>
        </div>
    </footer>

    }
}

export default Footer