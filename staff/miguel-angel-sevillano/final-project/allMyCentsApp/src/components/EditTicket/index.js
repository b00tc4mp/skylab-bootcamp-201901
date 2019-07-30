
import React, { Fragment, useState } from 'react';
import { Modal } from '../Modal'
import Toast from '../Toast'
import './index.sass'


function EditTicket({ ticketToEdit, onUpdate, ticketOkEdited, ticketError }) {

    const [notNumber, setNotNumber] = useState(false)
    const [notProuct, setNotProduct] = useState(true)
    const [noErrors, setNoErrors] = useState(true)


    function handleCloseModal() {
        setNotNumber(false)
        setNotProduct(false)
        setNoErrors(false)
    }


    function handleUpdateTicket(e) {
        e.preventDefault()
        setNoErrors(true)
        setNotProduct(true)
        setNotNumber(false)
        

        let updatedInput
        let string = ""
        let number = ""

        if (e.target[0].value.length > 0) string = e.target[0].value
        else string = e.target[0].placeholder

        if (e.target[1].value.length > 0) number = Number(e.target[1].value)
        else number = Number(e.target[1].placeholder)

        if (isNaN(number)) setNotNumber(true)
        else {

            updatedInput = { name: string, Euro: number }

            let position = e.target[2].value

            onUpdate(ticketId, updatedInput, position)


        }


    }

    let ticketId = ticketToEdit._id
    let ticket = []

    ticket = ticketToEdit.items.map(({ name, Euro }, index) => {

        return (
            <form id="updateForm" onSubmit={handleUpdateTicket}>
                <p>Product</p> <input class="input" id="productImput" type="text" name="item" placeholder={name} /><p id="euroName">Euro</p><input class="input" type="text" id="euroImput" name="Euro" placeholder={Euro} />
                <button class="button is-success"  id="button"value={index} >Update</button>
            </form>
        )
    })


    return <Fragment>
        {!notNumber &&<div class="editTicketContainer"><div class="box" id="editTicket">{ticket}</div></div> }
        {notNumber && <Modal onClose={handleCloseModal} >
            <div>
                {"Wrong information detected , please check the filed"}
            </div>
        </Modal>}
        {notProuct && ticketError && <Modal onClose={handleCloseModal} >
            <div>
                {ticketError}
            </div>
        </Modal>}

        {!notNumber && noErrors && ticketOkEdited && <Toast error={ticketOkEdited} toastType="is-success" />}
    </Fragment>


}

export default EditTicket