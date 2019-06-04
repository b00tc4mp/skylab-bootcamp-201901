import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import logic from '../../logic'
import UserProfile from '../UserProfile/index'
import UserContext from '../UserContext/index'
import ScanTicket from '../ScanTicket/index'
import TicketDetail from '../TicketDetail/index'
import Charts from '../Charts'
import { Modal } from "../Modal"



function Home(props) {

    let { loggedOk, registerOk, setLogOk, setRegOk, userName } = useContext(UserContext)
    let [profile, setProfile] = useState(null)
    let [ticketProcessed, setTiketToProcess] = useState(null)
    let [onError, setError] = useState(null)
    let [generalMessage, setGeneralMessage] = useState(null)
    let [globalChart, setGlobalChart] = useState(null)



    useEffect(() => {

        return (async () => {

            const response = await logic.globalTicket(sessionStorage.token)
            if (response.length) setGlobalChart(response)

        })

    })

    function handleCloseModal() {
        setGeneralMessage(null)
    }

    function toLanding() {
        sessionStorage.clear()
        setLogOk(null)
        props.history.push("/")
    }

    function handleProfile() {

        return (async () => {

            try {
                const user = await logic.retrieveUser(sessionStorage.token)
                setProfile(user)
                props.history.push("/Home/Profile")

            }
            catch (error) { return error.message }
        })()
    }

    function toScanTicket() {
        props.history.push("/Home/ScanTicket")
    }

    function handleScannedTicket(scannedTicket) {

        return (async () => {
            try {

                const result = await logic.scanTicket(scannedTicket)
                setTiketToProcess(result)
                props.history.push("/Home/TicketDetail")
            } catch (error) { setError(error.message) }
        })()

    }


    function handleSaveTicket(ticketToSave) {
        return (async () => {
            try {

                const res = await logic.saveTicket(sessionStorage.token, ticketToSave)
                props.history.push("/Home")
                setGeneralMessage(res)

            } catch (error) { return "Something went wrong , try again please" }
        })()

    }

    return <Fragment>

        {generalMessage && <Modal onClose={handleCloseModal} >
            <div>
                {generalMessage}
            </div>
        </Modal>}


        <Route>
            <div>

                <p>Welcome {userName}</p>
                <button class="button is-link" onClick={toLanding}>LogOut</button>
                <button class="button is-link" onClick={handleProfile}>User Profile</button>
                <button class="button is-link" onClick={toScanTicket}>Scan Ticket</button>

            </div>


            <Route exact path="/Home" render={() => globalChart ? <Charts data={globalChart} /> : <p>Not enough tickets to display global consumption </p>} />

            <Route exact path="/Home/Profile" render={() =>

                <UserProfile getUser={profile} />
            } />

            <Route exact path="/Home/ScanTicket" render={() =>
                <ScanTicket scannedTicket={handleScannedTicket} />
            } />

            <Route exact path="/Home/TicketDetail" render={() =>
                <TicketDetail processedTicket={ticketProcessed} toSaveTicket={handleSaveTicket} />
            } />

        </Route>
    </Fragment>


}

export default withRouter(Home)