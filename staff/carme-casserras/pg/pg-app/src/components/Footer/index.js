import React, { Fragment } from 'react'
import logic from '../../logic'
import './index.sass'

function Maps(props) {

    // if(!logic.isUserLoggedIn) props.history.push('/login')
return(<Fragment>
    <div id="navbar-bottom">
            <ul className="navigation">    
                <li><a href="/search/locations"><img  id="map" src="../../../images/map.png" /></a></li>
            </ul>
        </div>
        </Fragment>
)
}

export default Maps