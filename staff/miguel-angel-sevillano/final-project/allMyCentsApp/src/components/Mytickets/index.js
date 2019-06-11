import React, { useState } from 'react';
import Toast from '../Toast'
import { ConfirmAlert } from '../ConfirmAlert'
import './index.sass'
import errorLogo from '../../images/error-logo.png'



function MyTickets({ data,
    noTicketsFound,
    deleteTicket,
    addTicket,
    getTicketDetail,
    ticketOkDeleted,
    deleteAllTickets }) {

    let ticketsProccesed = []


    const [oK, setOk] = useState(false)
    const [notOk, setNotOk] = useState(false)
    const [popAlertConfirm, setPopAlertConfirm] = useState(false)
    let [okToDeleteInfo, setOkToDeleteInfo] = useState(false)


    function handleToDetail(e) {

        getTicketDetail(e.target.value)
    }









    function handleNo() { setPopAlertConfirm(false) }



    function handleYes() {

        if (!okToDeleteInfo) {
            deleteAllTickets()
            setPopAlertConfirm(false)
        } else {
            deleteTicket(okToDeleteInfo)
            setPopAlertConfirm(false)
        }
    }


    function handleToDeleteAllTickets() {
        setOkToDeleteInfo(false)
        setPopAlertConfirm(true)
    }

    function handleToDeleteTicket(e) {
        setPopAlertConfirm(true)
        setOkToDeleteInfo(e.target.value)
    }

    if (data) {


        ticketsProccesed = data.map(({ date, _id, items }) => {
            return <div class="box" id="animation">
                <div class="ticket">
                    <span class="tag is-warning is-large">Ticket date :{date}</span>

                    {
                        items.map(item => {
                            return <div class="ticketElements">

                                <span >{item.name}</span>
                                <span class="tag  is-warning is-medium">{item.Euro} €</span>


                            </div>
                        })
                    }
                </div>
                <div class="ticketButtons">

                    <button className="button is-link" value={_id} onClick={handleToDetail}>Edit Ticket</button>
                    <button className="button is-danger" value={_id} id="lastTicket" onClick={handleToDeleteTicket}>Delete Ticket</button>
                </div>
            </div>
        })
    }


    return <div class="ticketsBody">
        {data &&
            <div class="mainButtonsContainer">
                <div class="box" id="mainButtons">
                    <button className="button is-success" onClick={() => addTicket()}>Add Ticket</button>
                    <button class="button is-danger" id="deleteAllTicketsButton" onClick={handleToDeleteAllTickets} >Delete All Tickets</button>
                </div>
            </div>}
        {ticketOkDeleted &&
            <Toast error={ticketOkDeleted} toastType="is-danger" />}
        {noTicketsFound &&
            <div class="noTicketsContainer">

                <div class="box" id="noTicketElements">
                    <img class="errorLogoTickets" src={errorLogo}  ></img>
                    <p>No Tickets Found</p>
                    <button className="button is-success" onClick={() => addTicket()}>Add Ticket</button>
                </div>

            </div>}
        <div class="wholeTicket">
            {ticketsProccesed}
        </div>
        <div>
            {popAlertConfirm && <ConfirmAlert onSelectNo={handleNo} onSelectYes={handleYes}></ConfirmAlert>}
        </div>

    </div>
}


export default MyTickets