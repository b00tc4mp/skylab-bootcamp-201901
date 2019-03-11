import React, { Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Navbar from '../Navbar'
import SideMenu from '../SideMenu'
import CommandPannel from '../CommandPannel'
import UserPanel from '../UserPanel'
import Reporter from '../Reporter'

function Admin() {

    return (<Fragment>
        <Navbar />
        <div className="columns">
            < SideMenu />
            <div className="column">
                <Route path="/admin/cmd" component={CommandPannel} />
                <Route path="/admin/user" component={UserPanel} />
                <Route path="/admin/report" component={Reporter} />
            </div>
        </div>
    </Fragment>)
}

export default withRouter(Admin)