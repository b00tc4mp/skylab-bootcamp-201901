import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

function Nav() {

    return (<Fragment>
        <div id="navbar-top">
            <ul className="navbar-left">
                <li>
                    <Link to="/search/category">
                        <img id="logo" src="/../../../images/logo.png" alt="logo"/>
                    </Link>
                </li>
            </ul>
            <div className="navbar-right">
                <ul className="navigation">
                    <li>
                        <Link to="/search/user/things">
                            <img id="awards" src="/../../../images/award.png" alt="awards"/>
                        </Link>
                    </li>  
                    <li>
                        <Link to="/things">
                            <img id="put" src="/../../../images/put.png" alt="put" />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </Fragment>
    )
}

export default Nav
