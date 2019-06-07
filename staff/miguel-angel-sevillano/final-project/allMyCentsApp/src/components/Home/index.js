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

    let{checkAlerts} = props

    debugger


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
    const [ticketEditedOk, setTicketEditedOk] = useState(null)
    const [ticketEditedError, setTicketEditedError] = useState(null)
    const [ticketDeleted, setTicketDeleted] = useState(null)
    const [ticketProcessed, setTiketToProcess] = useState(null)

    //ticketDetail

    const [ticketDetailError, setTicketDetailError] = useState(null)

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

            try {
                const response = await logic.globalTicket(sessionStorage.token)
                setGlobalChart(response)

            } catch{ setGlobalChart(null) }

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

        return (async () => {
            await mountGlobalChart()
            props.history.push("/Home")

        })()

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

        return (async () => {

            setTicketDeleted(null)
            setTicketEditedOk(null)


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
            setTicketEditedError(null)

            try {
                const ticketUpdated = await logic.editTicket(sessionStorage.token, ticketId, data, position)
                const ticketDetail = await logic.getTicket(sessionStorage.token, ticketId)
                setTicketToEddit(ticketDetail)
                setTicketEditedOk(ticketUpdated)
            }
            catch (error) {
                setTicketEditedOk(false)
                setTicketEditedError(error.message)
            }
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
            setTicketDetailError(null)
            try {

                const res = await logic.saveTicket(sessionStorage.token, ticketToSave)
                props.history.push("/Home")
                setGlobalMessage(res)
                setChart(false)


            } catch (error) { setTicketDetailError(error.message) }
        })()

    }

    function handleDeleteTicket(ticketId) {

        return (async () => {
            try {

                const res = await logic.deleteTicket(sessionStorage.token, ticketId)
                setTicketDeleted(res)
                const tickets = await logic.listTickets(sessionStorage.token)
                setTicketDeleted(null)
                setMyTickets(tickets)
                setChart(false)



            } catch (error) { setGlobalMessage(error.message) }
        })()

    }

    function handleDeleteAllTickets() {

        return (async () => {
            try {
                const res = await logic.deleteAllTickets(sessionStorage.token)
                setChart(false)
                setMyTickets(null)

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

            setAddAlerToK(null)
            setAddAlertError(null)
            try {

                const res = await logic.addAlert(sessionStorage.token, newAlert)
                setAddAlerToK(res)
                const alerts = await logic.listAlerts(sessionStorage.token)
                setAddAlerToK(null)
                setMyAlerts(alerts)


            } catch (error) { setAddAlertError(error.message) }
        })()


    }

    function hanldeDeleteAlert(id) {

        return (async () => {

            try {
                const res = await logic.deleteAlert(sessionStorage.token, id)
                setdeleteAlerToK(res)

                const ale = await logic.listAlerts(sessionStorage.token, id)
                setdeleteAlerToK(null)
                setMyAlerts(ale)


            } catch (error) {
                setdeleteAlerToK(null)
                setMyAlerts(null)
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


    function handleSelectedMonth(mon, monthString) {
        return (async () => {

            try {

                const res = await logic.monthTicket(sessionStorage.token, mon)

                setMonth({ monthString, res })
                setMonthError(null)

            } catch (error) {
                debugger
                setMonthError(error)
                setMonth(null)

            }

        })()
    }

    function handleMyAlerts() {

        return (async () => {

            setAddAlerToK(null)
            setdeleteAlerToK(null)
            setAddAlertError(null)

            try {

                const res = await logic.listAlerts(sessionStorage.token)
                debugger
                setMyAlerts(res)
                props.history.push("/Home/MyAlerts")
            } catch (error) {
                props.history.push("/Home/MyAlerts")
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

        {checkAlerts && <Modal onClose={handleCloseModal} >
            <div>
                {checkAlerts}
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
                    toSaveTicket={handleSaveTicket}
                    getTicketDetailError={ticketDetailError}
                    toScanAgain={toScanTicket} />
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
                    clearMonth={() => setMonth(null)}
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
                    ticketError={ticketEditedError}

                />

            } />

        </Route>
    </Fragment>


}

export default withRouter(Home)