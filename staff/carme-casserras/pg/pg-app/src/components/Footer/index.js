import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import './index.sass'

function Map() {    

    return (<Fragment>
        <div id="navbar-bottom">
            <ul className="navigation">
                <li>
                    {/* <Link to="/search/locations"> */}
                    <Link to="/search/locations">
                        <img className="img-map" id="map" src="../../../images/map.png" alt="map"/>
                    </Link>
                </li>
            </ul>
        </div>
    </Fragment>
    )
}

export default Map