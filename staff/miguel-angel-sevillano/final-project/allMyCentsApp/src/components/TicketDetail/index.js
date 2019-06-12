import React, { useState, useEffect } from 'react';
import './index.sass'
import { Modal } from "../Modal"
import errorLogo from "../../images/error-logo.png"


function TicketDetail({ processedTicket, toSaveTicket, getTicketDetailError, toScanAgain }) {
    debugger
    let [modalActive, setModal] = useState(false)
    let [errorMessage, setError] = useState(null)
    let [errorFromSaeve, setErrorFs] = useState(true)
    let [errorChecked, setErrorChecked] = useState(false)
    


    const { result, scanedTicket } = processedTicket

debugger



    let savedTicket = []
    let errorFound = false


    let ticket = result.map(item => {

        return (<div class="control" id="ticket">
            <div class="itemTicketDetail">Product <input class="input" type="text" name="item" placeholder={item.name} /> </div>
            <div class="itemTicketDetail">Euro <input class="input" type="text" name="Euro" placeholder={item.Euro} /></div>
        </div>
        )

    })



    function handleCloseModal() {
        setErrorChecked(true)
        setErrorFs(false)
        setModal(false)


    }



    function handleSubmit(e) {
        setErrorFs(true)

        e.preventDefault()

        let string = []
        let number = []

        for (let i = 0; i < e.target.item.length; i++) {


            if (e.target.item[i].value) string.push(e.target.item[i].value)
            else (string.push(e.target.item[i].placeholder))

            if (e.target.Euro[i].value) number.push(e.target.Euro[i].value)
            else (number.push(e.target.Euro[i].placeholder))
        }



        for (let i = 0; i < string.length; i++) { savedTicket.push({ name: string[i], Euro: Number(number[i].replace(/,/g, ".")) }) }

        savedTicket.forEach(item => {

            errorFound = false

            if (isNaN(item.Euro)) {
                setError("Wrong information detected , please check your ticket")
                setModal(true)
                errorFound = true
            }


            if (item.Euro > 20 && !errorChecked) {
                setError("Warning prices seems to be high above , check ticket please")
                setModal(true)
                errorFound = true
            }

        })

        if (!errorFound && errorChecked) toSaveTicket(savedTicket)
        else if (!errorFound) toSaveTicket(savedTicket)


    }


    return <div class="ticketDetailBody">


        {ticket.length ?
            <div class="ticketCointaner">
                <div class="box" id="ticketPosition">
                    <form onSubmit={handleSubmit}>
                        <div class="ticketDetailForm" >
                            {ticket}
                        </div>
                        <button class="button is-success" id="saveTicket" >Save Ticket</button>

                    </form></div> </div> :
            <div class="errorContainer">
                <div class="box" id="error">
                    <img class="errorLogoTicketDetail" src={errorLogo}  ></img>
                    <p>No results from scanned ticket</p>
                    <button class="button is-success" onClick={() => toScanAgain()} >Scan a ticket again</button>

                </div>
            </div>}

        {modalActive && !getTicketDetailError && <Modal onClose={handleCloseModal} >
            <div>
                {errorMessage}
            </div>
        </Modal>}


        {getTicketDetailError && errorFromSaeve && <Modal onClose={handleCloseModal} >
            <div>
                {getTicketDetailError}
            </div>
        </Modal>}

    </div>

}



export default TicketDetail