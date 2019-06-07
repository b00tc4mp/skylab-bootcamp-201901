import '../../../node_modules/@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import DropNCrop from '@synapsestudios/react-drop-n-crop';

import React, { useState } from 'react';
import logo from './logo.png';
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



    return <div>
        <div class="box">
            <div class="box">
                <DropNCrop onChange={itsChanging} value={state} canvasHeight="500px" canvasWidth="500px" maxFileSize={6145728} cropperOptions={{ guides: true, viewMode: 1, autoCropArea: 1 }} />
                <div class="box">
                    <p>Please fit your image as this example</p>
                </div>
                <img src={logo} width="400px"></img>
            </div>
            {result && <div class="box">
                <img src={result} width="400px"></img>
            </div>}
        </div>

        {loading && <LoadingModal >
            <div>
                <p>Processing image.......</p>
                <progress class="progress is-large is-info" max="100"></progress>
            </div>
        </LoadingModal>}
        <div class="buttons">
            <span class={isDisabledPreview} onClick={handlePreview}>Preview image</span>
            <span class="button is-danger" onClick={handleClear}>Clear image</span>
            <span class={isDisabledSend} onClick={handleSend}>Send image</span>
        </div>

    </div>


}

export default ScanTicket