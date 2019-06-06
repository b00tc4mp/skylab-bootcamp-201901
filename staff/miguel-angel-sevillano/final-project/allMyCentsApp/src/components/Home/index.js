import React, { useState, useContext, Fragment} from 'react';
import { Route,withRouter} from "react-router-dom";
import logic from '../../logic'
import UserProfile from '../UserProfile/index'
import UserContext from '../UserContext/index'
import ScanTicket from '../ScanTicket/index'
import TicketDetail from '../TicketDetail/index'
import GlobalChart from '../GlobalChart'
import { Modal } from "../Modal"
import Navbar from "../Navbar"
import MyTickets from "../Mytickets"
import MyAlerts from "../MyAlerts"
import Estadistics from '../Estadistics'




function Home(props) {

    const { loggedOk, registerOk, setLogOk, setRegOk, userName } = useContext(UserContext)
    const [profile, setProfile] = useState(null)
    const [ticketProcessed, setTiketToProcess] = useState(null)
    const [generalMessage, setGeneralMessage] = useState(null)
    const [globalChart, setGlobalChart] = useState(null)

    const [updateChart, setChart] = useState(false)

    const [myTickets, setMyTickets] = useState(null)

    const [ticketDeleted, setTicketDeleted] = useState(null)



    //list Alerts
    const [myAlerts, setMyAlerts] = useState(null)


    //addAlert
    const [addAlertError, setAddAlertError] = useState(null)
    const [addAlertOk, setAddAlerToK] = useState(null)

    //deleteAlert
    const [deleteAlertOk, setdeleteAlerToK] = useState(null)


    //category

    const[category,setCategory]=useState(null)
    const[categoryError,setCategoryError]=useState(null)


    function mountGlobalChart() {

        return (async () => {
            const response = await logic.globalTicket(sessionStorage.token)
            if (response.length) setGlobalChart(response)
        })()

    }


    if (!updateChart) {
        mountGlobalChart()
        setChart(true)
    }


    function handleCloseModal() {
        setGeneralMessage(null)
    }

    function toScanTicket() { props.history.push("/Home/ScanTicket") }
    function toHome() { props.history.push("/Home") }
    function toEstadistics() { props.history.push("/Home/Estadistics") }

    function toLanding() {
        sessionStorage.clear()
        setLogOk(null)
        props.history.push("/")
    }

    function handleMyTcikets() {
        setTicketDeleted(null)

        return (async () => {

            try {
                const tickets = await logic.listTickets(sessionStorage.token)
                setMyTickets(tickets)
                props.history.push("/Home/MyTickets")
            } catch (error) { setGeneralMessage(error.message) }

        })()

    }

    function handleProfile() {

        return (async () => {

            try {
                const user = await logic.retrieveUser(sessionStorage.token)
                setProfile(user)
                props.history.push("/Home/Profile")

            }
            catch (error) { }
        })()
    }



    function handleScannedTicket(scannedTicket) {

        return (async () => {

            try {

                const result = await logic.scanTicket(scannedTicket)
                setTiketToProcess(result)
                props.history.push("/Home/TicketDetail")
            } catch (error) { }
        })()

    }


    function handleSaveTicket(ticketToSave) {
        return (async () => {
            try {

                const res = await logic.saveTicket(sessionStorage.token, ticketToSave)
                props.history.push("/Home")
                setGeneralMessage(res)
                setChart(false)


            } catch (error) { }
        })()

    }

    function handleDeleteTicket(ticketId) {

        return (async () => {
            try {

                const res = await logic.deleteTicket(sessionStorage.token, ticketId)
                setTicketDeleted(res)
                handleMyTcikets()
                setChart(false)


            } catch (error) { generalMessage(error) }
        })()

    }




    function handleNewAlert(newAlert) {

        return (async () => {
            try {

                const res = await logic.addAlert(sessionStorage.token, newAlert)
                if ("succesfully") setAddAlerToK(res)
                handleMyAlerts()


            } catch (error) { setAddAlertError(error.message) }
        })()


    }

    function hanldeDeleteAlert(id) {

        return (async () => {

            try {

                const res = await logic.deleteAlert(sessionStorage.token, id)
                setdeleteAlerToK(res)
                handleMyAlerts()

            } catch (error) {
                setAddAlertError(error.message)
            }

        })()
    }

    function hanldeSelectedCategory(cat){
        return (async () => {

            try {

                const res = await logic.getProductByCategory(sessionStorage.token, cat)
               
                setCategory(res)

            } catch (error) {
                setCategoryError(error.message)
            }

        })()
    }

    function handleMyAlerts() {

        return (async () => {
            setAddAlerToK(null)
            setdeleteAlerToK(null)

            try {

                const res = await logic.listAlerts(sessionStorage.token)
                debugger
                setMyAlerts(res)
                props.history.push("/Home/MyAlerts")
            } catch (error) {
                props.history.push("/Home/MyAlerts")
                setGeneralMessage(error.message)
            }

        })()
    }

    return <Fragment>


        <Navbar goHome={toHome} goProfile={handleProfile} goScanTicket={toScanTicket} goMytickets={handleMyTcikets} goMyAlerts={handleMyAlerts} goMyEstadistics={toEstadistics} />

        {generalMessage && <Modal onClose={handleCloseModal} >
            <div>
                {generalMessage}
            </div>
        </Modal>}


        <Route>
            <div class="box">
                <p>Welcome {userName}</p>
            </div>


            <Route exact path="/Home" render={() => globalChart ? <div class="box"> <GlobalChart data={globalChart} /></div> : <p>Not enough tickets to display global consumption </p>} />

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
                <MyTickets data={myTickets} deleteTicket={handleDeleteTicket} ticketOkDeleted={ticketDeleted} />
            } />

            <Route exact path="/Home/MyAlerts" render={() =>
                <MyAlerts data={myAlerts} addAlert={handleNewAlert} addOneAlertError={addAlertError} deleteAlert={hanldeDeleteAlert} addedOk={addAlertOk} deletedOk={deleteAlertOk} />
            } />

            <Route exact path="/Home/Estadistics" render={() =>
                <Estadistics  selectedCategory={hanldeSelectedCategory}  recivedCategory={category}/>
            } />

        </Route>
    </Fragment>


}

export default withRouter(Home)