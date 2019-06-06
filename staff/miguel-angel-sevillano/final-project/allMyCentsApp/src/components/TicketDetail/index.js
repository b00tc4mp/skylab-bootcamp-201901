import React, { useState } from 'react';
import { stringTypeAnnotation } from '@babel/types';
import { Modal } from "../Modal"


function TicketDetail({ processedTicket, toSaveTicket }) {
debugger
    let [modalActive, setModal] = useState(false)
    let [errorMessage, setError] = useState(null)



    let savedTicket = []
    let errorFound = false

    let ticket = processedTicket.map(item => {

        return (<div class="control">
            Product <input class="input" type="text" name="item" placeholder={item.name} /> Euro <input class="input" type="text" name="Euro" placeholder={item.Euro} />
        </div>
        )

    })


    function handleCloseModal() {

        setModal(false)
    }



    function handleSubmit(e) {

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
debugger
        savedTicket.forEach(item => { if (isNaN(item.Euro)) errorFound = true })
        if (errorFound){ 
            setError("Wrong information detected , please check your ticket")
            setModal(true)
        }
        else {


            return (async () => {
                let res = await toSaveTicket(savedTicket)
                if (res) {
                    setError(res)
                    setModal(true)
                }

            })()

        }




    }


    return <div>

        <form id="registerForm" onSubmit={handleSubmit}>
            <button class="button is-success" >Save Ticket</button>
            {ticket}
        </form>

        {modalActive && <Modal onClose={handleCloseModal} >
            <div>
                {errorMessage}
            </div>
        </Modal>}

    </div>

}


export default TicketDetail