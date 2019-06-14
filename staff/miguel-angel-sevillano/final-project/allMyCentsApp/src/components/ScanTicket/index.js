import '../../../node_modules/@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import DropNCrop from '@synapsestudios/react-drop-n-crop';
import './index.sass'
import React, { useState } from 'react';
import logo from './logo.png';
import secondLogo from '../../images/secondLogo.png'
import { LoadingModal } from '../LoadingModal'


function ScanTicket({ scannedTicket }) {


    let [state, onChange] = useState(0)
    let [result, showPreview] = useState(null)

    let [isDisabledSend, setIsDisabledSend] = useState("button is-static")
    let [isDisabledPreview, setIsDisabledPreview] = useState("button is-static")

    let [loading, setLoading] = useState(false)


    function handlePreview() {
        let image = new Image();
        image.src = state.result
        showPreview(image.src)
    }

    function handleClear() {
        onChange(null)
        showPreview(null)
        setIsDisabledSend("button is-static")
        setIsDisabledPreview("button is-static")
    }

    function handleSend() {
        scannedTicket(state.result)
        setLoading(true)

    }

    function itsChanging(values) {
        onChange(values)
        setIsDisabledSend("button is-success")
        setIsDisabledPreview("button is-primary")
    }



    return <div class="scanBody">
        <span class="dragAndExample">
            <div class="box" id="drag">
                <p class="info">Please fit your ticket as this example</p>
                <img src={logo} width="400px"></img>
            </div>
            <div class="box" id="drag2">
                <DropNCrop onChange={itsChanging} value={state} canvasHeight="500px" canvasWidth="500px" maxFileSize={6145728} cropperOptions={{ guides: true, viewMode: 1, autoCropArea: 1 }} />
            </div>
            <div class="box" id="drag3">
                <p class="info ">Your ticket preview will be shown here</p>
                <img src={result} class="preview" label="No image"></img>
            </div>
        </span>



        {loading && <LoadingModal >
            <div>
            <img class="secondLogo" src={secondLogo}  ></img>
            </div>
            <div>
                <p className="tag is-warning is-medium">Processing ticket.......</p>

            </div>
        </LoadingModal>}
        <span class="scanTicketButtons">
        <div class="box">
            <div class="buttons">
                <span class={isDisabledPreview} onClick={handlePreview}>Preview ticket</span>
                <span class="button is-danger" onClick={handleClear}>Clear ticket</span>
                <span class={isDisabledSend} onClick={handleSend}>Send ticket</span>
            </div>
        </div>
        </span>
    </div>


}

export default ScanTicket