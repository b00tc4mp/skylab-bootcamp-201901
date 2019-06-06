import React, { useState, useEffect } from "react"
import { Modal } from "../Modal"
import { taggedTemplateExpression } from "@babel/types";
import Toast from '../Toast'

function MyAlerts({ data, addAlert, addOneAlertError, deleteAlert, addedOk, deletedOk }) {

    let alerts = []


    let [noAlerts, setNoAlerts] = useState(true)

    useEffect(() => {
        setNoAlerts(!noAlerts)
    }, [addOneAlertError])
    function handleCloseModal() { setNoAlerts(false) }




    function handleAlert(e) {
        e.preventDefault()

        const { name, maxValue } = e.target

        const newAlert = { name: name.value, Euro: 0, maxValue: Number(maxValue.value) }

        addAlert(newAlert)

    }

    function hanldeDeleteAlert(id) {
        deleteAlert(id)
    }

    debugger

    if (data instanceof Object) {
        debugger
        alerts = data.map(({ name, _id, Euro, maxValue }) => {
            let progressStatus = ""

            if (Euro < maxValue / 2.5) progressStatus = "progress is-success"
            if (Euro > maxValue / 2.2 && Euro < maxValue / 1.5) progressStatus = "progress is-warning"
            if (Euro > maxValue / 1.5) progressStatus = "progress is-danger"
            return <div class="box">
                <div class="box">
                    Product name : {name}
                    <button class="button is-danger" onClick={() => hanldeDeleteAlert(_id)}>Delete</button>
                </div>
                <div class="box">
                    Actual : {Euro} €
                    <progress class={progressStatus} value={Euro} max={maxValue}></progress>
                    Max : {maxValue} €
                </div>
            </div>
        })
    }




    return <div>
        {
            noAlerts && <Modal onClose={handleCloseModal} >
                <div calss="box">
                    {addOneAlertError}
                </div>
            </Modal>
        }

        {addedOk && <Toast error={addedOk} toastType="is-success" />}
        {deletedOk && <Toast error={deletedOk} toastType="is-danger" />}




        <div class="box">
            <form id="registerForm" onSubmit={handleAlert}>
                <input class="input field" type="text" name="name" placeholder="Product name" />
                <input class="input field" type="number" name="maxValue" placeholder="Alert value" />
                <button class="button is-link">Add Alert</button>
            </form>
        </div>

        {alerts.length > 0 && <div class="box">{alerts}</div>}
    </div>



}



export default MyAlerts