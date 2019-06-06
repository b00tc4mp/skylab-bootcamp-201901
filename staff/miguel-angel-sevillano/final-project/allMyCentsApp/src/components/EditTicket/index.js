
import React, { Fragment, useState } from 'react';
import { Modal } from '../Modal'
import Toast from '../Toast'


function EditTicket({ ticketToEdit, onUpdate,ticketOkEdited }) {

    const [notNumber, setNotNumber] = useState(false)

    function handleCloseModal() {

        setNotNumber(false)
    }



    function handleUpdateTicket(e) {
        e.preventDefault()

        let updatedInput
        let string = ""
        let number = ""

        if (e.target[0].value.length > 0) string = e.target[0].value
        else string = e.target[0].placeholder

        if (e.target[1].value.length > 0) number = Number(e.target[1].value)
        else number = Number(e.target[1].placeholder)

        if (isNaN(number)) setNotNumber(true)
        else {

            updatedInput= { name: string, Euro: number }

            let position = e.target[2].value

            onUpdate(ticketId, updatedInput, position)


        }


    }

    let ticketId = ticketToEdit._id
    let ticket = []

    ticket = ticketToEdit.items.map(({ name, Euro }, index) => {

        return (<>
            <form id="updateForm" onSubmit={handleUpdateTicket}>
                Product <input class="input" type="text" name="item" placeholder={name} /> Euro <input class="input" type="text" name="Euro" placeholder={Euro} />
                <button class="button is-primary" value={index} >Update</button>
            </form>
        </>)
    })


    return<Fragment>
        {!notNumber && <div class="box">{ticket}</div>}
        {notNumber && <Modal onClose={handleCloseModal} >
            <div>
                {"Wrong information detected , please check the filed"}
            </div>
        </Modal>}
        {ticketOkEdited && <Toast error={ticketOkEdited} toastType="is-success" />}
    </Fragment>

    
}

export default EditTicket