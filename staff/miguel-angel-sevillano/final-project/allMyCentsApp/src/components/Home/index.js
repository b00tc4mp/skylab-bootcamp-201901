import React, { useState, useContext, Fragment, useEffect } from 'react';
import { Route, withRouter, Redirect } from "react-router-dom";
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
import './index.sass'
import errorLogo from '../../images/error-logo.png'




function Home(props) {



    useEffect(() => {


        switch (props.location.pathname) {

            case "/Home/MyAlerts":
                debugger
                handleMyAlerts()
                break;
            case "/Home/Profile":
                debugger
                handleProfile()
                break;
            case "/Home/MyTickets":
                debugger
                handleMyTcikets()
                break;

            case "/Home":
                debugger
                handleUserName()
                break;


        }
    }, []);



    let { checkAlerts } = props

    const [alertsChecked, setAlertsChecked] = useState(checkAlerts)
    const { loggedOk, registerOk, setLogOk, setRegOk, userName, setName } = useContext(UserContext)
    const [profile, setProfile] = useState(null)
    const [globalMessage, setGlobalMessage] = useState(null)


    //userUpdate

    const [updatedUserOk, setUpdatedUserOk] = useState(null)
    const [updatedUserFail, setUpdatedUserFail] = useState(null)

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


    function handleUserName() {

        return (async () => {

            try {
                const user = await logic.retrieveUser(sessionStorage.token)
                setName(user.name)
            }
            catch (error) { }
        })()
    }



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
        setAlertsChecked(false)
    }

    function toScanTicket() { props.history.push("/Home/ScanTicket") }

    function toHome() {

        return (async () => {
            await mountGlobalChart()
            handleUserName()
            props.history.push("/Home")

        })()

    }



    function toEstadistics() {
        setProductsError(null)
        setProducts([])
        setCategoryError(null)
        setCategory(null)
        setMonth(null)
        setMonthError(null)
        props.history.push("/Home/Stadistics")

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
    function handleUpdateUser(data) {


        return (async () => {

            setUpdatedUserOk(null)
            setUpdatedUserFail(null)

            try {
                const res = await logic.updateUser(sessionStorage.token, data)

                const user = await logic.retrieveUser(sessionStorage.token)
                setProfile(user)
                setUpdatedUserOk(res)
            }
            catch (error) { setUpdatedUserFail(error.message) }
        })()
    }


    function handleProfile() {

       

        return (async () => {
            setUpdatedUserOk(null)
            setUpdatedUserFail(null)



            try {
                const user = await logic.retrieveUser(sessionStorage.token)
                setProfile(user)
                setName(user.name)
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
                props.history.push(`/Home/editTicket/${ticketId}`)


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
                setTiketToProcess({result,scannedTicket})
                props.history.push("/Home/TicketDetail")
            } catch (error) { }
        })()

    }


    function handleSaveTicket(ticketToSave) {


        return (async () => {
            setTicketDetailError(null)
            try {

                const res = await logic.saveTicket(sessionStorage.token, ticketToSave)
                toHome()
                setGlobalMessage(res)
                setChart(false)


            } catch (error) { setTicketDetailError(error.message) }
        })()

    }

    function handleDeleteTicket(ticketId) {

        return (async () => {
            try {
                setMyTickets(null)
                const res = await logic.deleteTicket(sessionStorage.token, ticketId)
                setTicketDeleted(res)
                const tickets = await logic.listTickets(sessionStorage.token)
                setTicketDeleted(null)
                setMyTickets(tickets)
                setChart(false)



            } catch (error) { handleMyTcikets() }
        })()

    }

    function handleDeleteAllTickets() {

        return (async () => {
            try {

                const res = await logic.deleteAllTickets(sessionStorage.token)
                setChart(false)
                setMyTickets(null)
                handleMyTcikets()

            } catch (error) { handleMyTcikets() }
        })()

    }

    function handleFindProduct(product) {

        setProductsError(null)
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


    function handleSelectedMonth(mon, monthString, year) {
        return (async () => {

            try {

                const res = await logic.monthTicket(sessionStorage.token, mon)

                setMonth({ monthString, res, year })
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


        <div className="homeBody">
            <Navbar class="navBar"
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

            {alertsChecked && <Modal onClose={handleCloseModal} >
                <div>
                    {alertsChecked}
                </div>
            </Modal>}


            <Route exact path="/Home" render={() =>
                globalChart ? <>
                    <span class="welcome">
                        <div class="box" id="wlcomeUserName">
                            {userName && <p>Welcome {userName} ! </p>}
                        </div>
                    </span>
                    <div class="globalChart">
                        <div class="box is-hidden-mobile" >
                            <GlobalChart data={globalChart} />
                        </div> </div> </> : <>
                        <span class="welcome">
                            <div class="box" id="wlcomeUserName">
                                <p>Welcome {userName} ! </p>
                            </div>
                        </span>
                        <span className="noTicketsError">
                            <div class="box" id="noTickersErrorMessage">
                                <img class="errorLogoHome" src={errorLogo}  ></img>
                                <p>Not enough tickets to display global consumption... </p>
                            </div>
                        </span>
                    </>
            } />


            <Route exact path="/Home/Profile" render={() =>

                profile &&
                <UserProfile getUser={profile} updateUserData={handleUpdateUser} updatedOk={updatedUserOk} updatedFail={updatedUserFail} />
            } />

            <Route exact path="/Home/ScanTicket" render={() =>
                <ScanTicket scannedTicket={handleScannedTicket} />
            } />

            <Route exact path="/Home/TicketDetail" render={() =>
                !ticketProcessed ? <Redirect to="/Home" /> : <TicketDetail
                    processedTicket={ticketProcessed}
                    toSaveTicket={handleSaveTicket}
                    getTicketDetailError={ticketDetailError}
                    toScanAgain={toScanTicket} />}
            />}

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

            <Route exact path="/Home/Stadistics" render={() =>

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

            <Route exact path="/Home/EditTicket/:ticketId" render={() =>
                !ticketToEdit ? <Redirect to="/Home" /> : <EditTicket ticketToEdit={ticketToEdit}
                    onUpdate={handleEditTicket}
                    ticketOkEdited={ticketEditedOk}
                    ticketError={ticketEditedError}

                />

            } />

        </div>
    </Fragment>


}

export default withRouter(Home)