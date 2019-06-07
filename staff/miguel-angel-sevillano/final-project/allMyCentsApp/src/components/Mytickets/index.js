import React, { useState } from 'react';
import Toast from '../Toast'
import { ConfirmAlert } from '../ConfirmAlert'
import { functionTypeAnnotation } from '@babel/types';



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
            return <div class="box">
               Ticket date :{date}

                {
                    items.map(item => {
                        return <>
                            <div class="box">Product: <span class="tag is-dark is medium ">{item.name}</span> </div>
                            <div class="box">Price: <span class="tag is-warning is medium">{item.Euro} €</span></div>
                        </>
                    })
                }
                <button className="button is-link" value={_id} onClick={handleToDetail}>Edit Ticket</button>
                <button className="button is-danger" value={_id} onClick={handleToDeleteTicket}>Delete Ticket</button>
            </div>
        })
    }


    return <div>
        {data &&
            <div class="box">
                <button class="button is-danger" onClick={handleToDeleteAllTickets} >Delete All Tickets</button>
                <button className="button is-success" onClick={() => addTicket()}>Add Ticket</button>
            </div>}
        {ticketOkDeleted &&
            <Toast error={ticketOkDeleted} toastType="is-danger" />}
        {noTicketsFound &&
            <span>
                <div class="box">No Tickets Found</div>
                <button className="button is-success" onClick={() => addTicket()}>Add Ticket</button>
            </span>}
        {ticketsProccesed}

        <div>
            {popAlertConfirm && <ConfirmAlert onSelectNo={handleNo} onSelectYes={handleYes}></ConfirmAlert>}
        </div>

    </div>
}


export default MyTickets