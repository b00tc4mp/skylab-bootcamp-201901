import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import logic from '../../logic'
import UserProfile from '../UserProfile/index'
import UserContext from '../UserContext/index'
import ScanTicket from '../ScanTicket/index'
import TicketDetail from '../TicketDetail/index'
import Charts from '../Charts'
import { Modal } from "../Modal"
import Navbar from "../Navbar"
import MyTickets from "../Mytickets"



function Home(props) {

    let { loggedOk, registerOk, setLogOk, setRegOk, userName } = useContext(UserContext)
    let [profile, setProfile] = useState(null)
    let [ticketProcessed, setTiketToProcess] = useState(null)
    let [onError, setError] = useState(null)
    let [generalMessage, setGeneralMessage] = useState(null)
    let [globalChart, setGlobalChart] = useState(null)
    let [myTickets, setMyTickets] = useState(null)



    useEffect(() => {
        return (async () => {
            const response = await logic.globalTicket(sessionStorage.token)
            if (response.length) setGlobalChart(response)
        })
    })

    function handleCloseModal() {
        setGeneralMessage(null)
    }

    function toScanTicket() { props.history.push("/Home/ScanTicket") }
    function toHome() { props.history.push("/Home") }

    function toLanding() {
        sessionStorage.clear()
        setLogOk(null)
        props.history.push("/")
    }

    function handleMyTcikets() {

        return (async () => {

            try {
                const tickets = await logic.listTickets(sessionStorage.token)
                setMyTickets(tickets)
                props.history.push("/Home/MyTickets")  
            } catch (error) { console.log(error) }

        })()

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


        <Navbar goHome={toHome} goProfile={handleProfile} goScanTicket={toScanTicket} goMytickets={handleMyTcikets} />

        {generalMessage && <Modal onClose={handleCloseModal} >
            <div>
                {generalMessage}
            </div>
        </Modal>}


        <Route>
            <div class="box">
                <p>Welcome {userName}</p>    
            </div>


            <Route exact path="/Home" render={() => globalChart ?<div class="box"> <Charts data={globalChart} /></div> : <p>Not enough tickets to display global consumption </p>} />

            <Route exact path="/Home/Profile" render={() =>

                <UserProfile getUser={profile} />
            } />

            <Route exact path="/Home/ScanTicket" render={() =>
                <ScanTicket scannedTicket={handleScannedTicket} />
            } />

            <Route exact path="/Home/TicketDetail" render={() =>
                <TicketDetail processedTicket={ticketProcessed} toSaveTicket={handleSaveTicket} />
            } />

            <Route exact path="/Home/MyTickets" render={() =>
                <MyTickets data={myTickets} />
            } />

        </Route>
    </Fragment>


}

export default withRouter(Home)