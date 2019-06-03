import React, { useState, useContext, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import logic from '../../logic'
import UserProfile from '../UserProfile/index'
import UserContext from '../UserContext/index'
import ScanTicket from '../ScanTicket/index'
import TicketDetail from '../TicketDetail/index'



function Home(props) {

    let { loggedOk, registerOk, setLogOk, setRegOk, userName } = useContext(UserContext)

    let [profile, setProfile] = useState(null)
    let [ticketProcessed, setTiketToProcess] = useState(null)

    function toLanding() {
        sessionStorage.clear()
        setLogOk(null)
        props.history.push("/")
    }

    function handleProfile() {

        let token = sessionStorage.token

        return (async () => {

            try {
                const user = await logic.retrieveUser(token)
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

        return(async()=>{
            try{
             
            const result =await logic.scanTicket(scannedTicket)
            debugger
            setTiketToProcess(result)
            props.history.push("/Home/TicketDetail")
            }catch(error){ return error}
        })()
        


    }

    return <Fragment>


        <Route>
            <div>
                <p>Welcome {userName}</p>
                <button onClick={toLanding}>LogOut</button>
                <button onClick={handleProfile}>User Profile</button>
                <button onClick={toScanTicket}>Scan Ticket</button>
            </div>

            <Route path="/Home/Profile" render={() =>

                <UserProfile getUser={profile} />
            } />

            <Route exact path="/Home/ScanTicket" render={() =>
                <ScanTicket scannedTicket={handleScannedTicket} />
            } />

            <Route exact path="/Home/TicketDetail" render={() =>
                <TicketDetail   processedTicket={ticketProcessed} />
            } />

        </Route>
    </Fragment>


}

export default withRouter(Home)