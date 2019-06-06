import React, { useState, useContext, Fragment } from 'react';
import { Route, withRouter } from "react-router-dom";
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
import EditTicket from '../EditTicket'




function Home(props) {

    const { loggedOk, registerOk, setLogOk, setRegOk, userName } = useContext(UserContext)



    const [profile, setProfile] = useState(null)

    const [globalMessage, setGlobalMessage] = useState(null)

    //charts

    const [globalChart, setGlobalChart] = useState(null)
    const [updateChart, setChart] = useState(false)


    //tickets
    const [myTickets, setMyTickets] = useState(null)
    const [noTickets, setNoTickets] = useState(null)
    const [ticketToEdit, setTicketToEddit] = useState(null)
    const [ticketEditedOk,setTicketEditedOk]=useState(null)
    const [ticketDeleted, setTicketDeleted] = useState(null)
    const [ticketProcessed, setTiketToProcess] = useState(null)



    //list Alerts
    const [myAlerts, setMyAlerts] = useState(null)


    //addAlert
    const [addAlertError, setAddAlertError] = useState(null)
    const [addAlertOk, setAddAlerToK] = useState(null)

    //deleteAlert
    const [deleteAlertOk, setdeleteAlerToK] = useState(null)


    //category

    const [category, setCategory] = useState(null)
    const [categoryError, setCategoryError] = useState(null)


    //month

    const [month, setMonth] = useState(null)
    const [monthError, setMonthError] = useState(null)


    //products

    const [products, setProducts] = useState([])
    const [productsError, setProductsError] = useState(null)



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
        setGlobalMessage(null)
    }

    function toScanTicket() { props.history.push("/Home/ScanTicket") }

    function toHome() {
        setChart(null)
        props.history.push("/Home")
    }

    function toEstadistics() {
        setProducts([])
        setCategoryError(null)
        setCategory(null)
        props.history.push("/Home/Estadistics")

    }

    function logOut() {
        sessionStorage.clear()
        setLogOk(null)
        props.history.push("/")
    }

    function handleMyTcikets() {
        setTicketDeleted(null)
        setMyTickets(null)


        return (async () => {

            try {
                const tickets = await logic.listTickets(sessionStorage.token)
                setMyTickets(tickets)
                setNoTickets(null)
                props.history.push("/Home/MyTickets")
            } catch (error) {
                setNoTickets(error.message)
                props.history.push("/Home/MyTickets")
            }

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

    function handleTicketDetail(ticketId) {
        return (async () => {

            try {
                const ticketDetail = await logic.getTicket(sessionStorage.token, ticketId)
                setTicketToEddit(ticketDetail)
                props.history.push("/Home/EditTicket")


            }
            catch (error) { }
        })()
    }

    function handleEditTicket(ticketId, data, position) {

        return (async () => {

            try {
                const ticketUpdated = await logic.editTicket(sessionStorage.token, ticketId, data, position)
                const ticketDetail = await logic.getTicket(sessionStorage.token, ticketId)
                setTicketToEddit(ticketDetail)
                setTicketEditedOk(ticketUpdated)
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
                setGlobalMessage(res)
                setChart(false)


            } catch (error) { }
        })()

    }

    function handleDeleteTicket(ticketId) {

        return (async () => {
            try {

                const res = await logic.deleteTicket(sessionStorage.token, ticketId)
                setTicketDeleted(res)
                setChart(false)
                handleMyTcikets()


            } catch (error) { setGlobalMessage(error.message) }
        })()

    }

    function handleDeleteAllTickets() {

        return (async () => {
            try {
                const res = await logic.deleteAllTickets(sessionStorage.token)
                setChart(false)
                setMyTickets(null)
                handleMyTcikets()



            } catch (error) { setGlobalMessage(error) }
        })()

    }

    function handleFindProduct(product) {


        return (async () => {
            try {
                const res = await logic.getAmountByProduct(sessionStorage.token, product)
                setProducts(products.concat({ res, product }))
            } catch (error) { setProductsError(error.message) }
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
                setMyAlerts(null)
                const res = await logic.deleteAlert(sessionStorage.token, id)
                const alerts = await logic.listAlerts(sessionStorage.token)
                setMyAlerts(alerts)
                setdeleteAlerToK(res)

            } catch (error) {
                setAddAlertError(error.message)
            }

        })()
    }

    function hanldeSelectedCategory(cat) {
        return (async () => {

            try {

                const res = await logic.getProductByCategory(sessionStorage.token, cat)

                setCategory({ res, cat })
                setCategoryError(null)

            } catch (error) {
                setCategory(null)
                setCategoryError(error.message)
            }

        })()
    }

    
    function handleSelectedMonth(mon) {
        return (async () => {

            try {

                const res = await logic.retrieveTicketsByDates(sessionStorage.token, mon)

                setMonth({ res, mon })
                setMonthError(null)

            } catch (error) {
                setMonth(null)
                setMonthError(error.message)
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
                setGlobalMessage(error.message)
            }

        })()
    }

    return <Fragment>


        <Navbar
            goHome={toHome}
            goProfile={handleProfile}
            goScanTicket={toScanTicket}
            goMytickets={handleMyTcikets}
            goMyAlerts={handleMyAlerts}
            goMyEstadistics={toEstadistics}
            logOut={logOut} />

        {globalMessage && <Modal onClose={handleCloseModal} >
            <div>
                {globalMessage}
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
                <TicketDetail
                    processedTicket={ticketProcessed}
                    toSaveTicket={handleSaveTicket} />
            } />

            <Route exact path="/Home/MyTickets" render={() =>
                <MyTickets
                    data={myTickets}
                    deleteTicket={handleDeleteTicket}
                    ticketOkDeleted={ticketDeleted}
                    deleteAllTickets={handleDeleteAllTickets}
                    noTicketsFound={noTickets}
                    addTicket={toScanTicket}
                    getTicketDetail={handleTicketDetail} />
            } />

            <Route exact path="/Home/MyAlerts" render={() =>
                <MyAlerts
                    data={myAlerts}
                    addAlert={handleNewAlert}
                    addOneAlertError={addAlertError}
                    deleteAlert={hanldeDeleteAlert}
                    addedOk={addAlertOk}
                    deletedOk={deleteAlertOk} />
            } />

            <Route exact path="/Home/Estadistics" render={() =>
                <Estadistics
                    selectedCategory={hanldeSelectedCategory}
                    recivedCategory={category}
                    selectedMonth={handleSelectedMonth}
                    recivedMonth={month}
                    recivedMonthError={monthError}
                    clearCategory={() => setCategory(null)}
                    clearMonth={()=>setMonth(null)}
                    recivedCategoryError={categoryError}
                    findProduct={handleFindProduct}
                    recivedProductsError={productsError}
                    recivedProduct={products}
                    clearProducts={() => setProducts([])} />

            } />

            <Route exact path="/Home/EditTicket" render={() =>
                <EditTicket ticketToEdit={ticketToEdit}
                    onUpdate={handleEditTicket}
                    ticketOkEdited={ticketEditedOk}

                />

            } />

        </Route>
    </Fragment>


}

export default withRouter(Home)