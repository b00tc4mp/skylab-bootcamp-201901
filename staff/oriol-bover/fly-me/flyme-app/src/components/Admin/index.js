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
import Programs from '../Program'
import ProgramCreator from '../ProgramCreator'
import ProgramDetail from '../ProgramDetail'

function Admin(props) {
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
            < SideMenu user={user} location={props.location} />
            <div className="column">
                {/* Flight section */}
                <Route exact path="/admin" render={props => <Flights userId={null} history={props.history} />} />
                <Route path="/admin/:flightId/flight" render={props => <FlightDetail flightId={props.match.params.flightId} user={user} history={props.history} />} />
                <Route path="/admin/user/:userId/flights" render={props => <Flights userId={props.match.params.userId} history={props.history} />} />

                {/* drone section */}
                <Route path="/admin/drones" render={props => <Drones user={user} history={props.history} />} />
                <Route path="/admin/drone/add" render={props => <DroneDetail user={user} history={props.history} droneId={null} />} />
                <Route path="/admin/drone/:droneId/edit" render={props => <DroneDetail user={user} history={props.history} droneId={props.match.params.droneId} />} />
                <Route path="/admin/drone/:droneId/command" render={props => <CommandPannel droneId={props.match.params.droneId} historyP={props.history} />} />

                {/* user section */}
                <Route exact path="/admin/user" component={UserPanel} />
                <Route path="/admin/report" component={Reporter} />

                {/* program section */}
                <Route exact path="/admin" render={props => <Programs userId={null} history={props.history} />} />
                <Route path="/admin/user/:userId/programs" render={props => <Programs userId={props.match.params.userId} history={props.history} />} />
                <Route exact path="/admin/:programId/program/" render={props => <ProgramDetail programId={props.match.params.programId} user={user} history={props.history} />} />
                <Route exact path="/admin/program/create" render={props => <ProgramCreator user={user} history={props.history} />} />
            </div>
        </div>
    </Fragment>)
}

export default withRouter(Admin)