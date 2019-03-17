import React, { Fragment, useEffect, useState } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Navbar from '../Navbar'
import SideMenu from '../SideMenu'
import CommandPannel from '../CommandPannel'
import UserPanel from '../UserPanel'
import Reporter from '../Reporter'
import Drones from '../Drone'
import DroneDetail from '../DroneDetail'
import Flights from '../Flights'
import FlightDetail from '../FlightDetail'
import Lab from '../Lab'

function Admin() {
    const [user, setUser] = useState(null)
    const [feedback, setFeedback] = useState(null)

    useEffect(() => {
        (async function () {
            try {
                return logic.retrieveUser()
                    .then(user => setUser(user))
                    .catch(err => setFeedback(err.message))
            } catch ({ message }) {
                setFeedback(message)
            }
        })();
    }, []);


    return (<Fragment>
        <Navbar />
        <div className="columns">
            < SideMenu user={user} />
            <div className="column">
                {/* Flight section */}
                <Route exact path="/admin" render={props => <Flights userId={null} history={props.history} />} />
                <Route path="/admin/flight/:flightId" render={props => <FlightDetail flightId={props.match.params.flightId} />} />
                <Route path="/admin/user/:userId/flights" render={props => <Flights userId={props.match.params.userId} history={props.history} />} />

                {/* drone section */}
                <Route path="/admin/drones" render={props => <Drones user={user} history={props.history} />} />
                <Route path="/admin/drone/add" render={props => <DroneDetail user={user} history={props.history} droneId={null} />} />
                <Route path="/admin/drone/:droneId/edit" render={props => <DroneDetail user={user} history={props.history} droneId={props.match.params.droneId} />} />
                <Route path="/admin/drone/:droneId/command" render={props => <CommandPannel droneId={props.match.params.droneId} history={props.history} />} />

                {/* user section */}
                <Route exact path="/admin/user" component={UserPanel} />
                <Route path="/admin/report" component={Reporter} />

                {/* program section */}
                <Route path="/admin/lab" component={Lab} />
            </div>
        </div>
    </Fragment>)
}

export default withRouter(Admin)