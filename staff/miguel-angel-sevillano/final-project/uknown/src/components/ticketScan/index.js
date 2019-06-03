import DropNCrop from '@synapsestudios/react-drop-n-crop';
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css';
import React,{useState} from 'react';
import logo from './logo.png'; 


function TicketScan() {


    let [state, onChange] = useState(0)
    let [result, showPreview] = useState(null)


    function handlePreview() {
        let image = new Image();
        image.src = state.result
        showPreview(image.src)
    }
    function handleClear(){
        onChange(null)
        showPreview(null)
    }




    return <div>
        <span>
            <DropNCrop onChange={onChange} value={state} canvasHeight="500px" canvasWidth="500px" maxFileSize={3145728} cropperOptions={{ guides: true, viewMode: 1, autoCropArea: 1 }} />
            <p>Please fit your image as this example</p>
            <image src={logo}></image>
        </span>
        <span>
            <img src={result} width="400px"></img>
        </span>
        <button class="button" onClick={handlePreview}>Preview</button>
        <button class="button" onClick={handleClear}>clear</button>

    </div>


}

export default TicketScan