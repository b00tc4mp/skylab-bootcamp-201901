import React from 'react'
import './index.sass'


function RegisterElectronicModule ({ownerId, handleRegisterElectronicModule, handleRegisterElectronicModuleShow, error}) {
    const handleSubmit = (e) => {
        e.preventDefault()
        let orderNumber, brand, model, cylinders, transmission, year, engine, device, serial, fail, owner
        
        orderNumber = e.target.orderNumber.value ? e.target.orderNumber.value : null
        brand = e.target.brand.value ?  e.target.brand.value : null
        model = e.target.model.value ? e.target.model.value : null
        cylinders = e.target.cylinders.value ? e.target.cylinders.value : null
        transmission = e.target.transmission.value ? e.target.transmission.value : null
        year = e.target.year.value ? e.target.year.value : null
        engine = e.target.engine.value ? e.target.engine.value : null
        device = e.target.device.value ? e.target.device.value : null
        serial = e.target.serial.value ? e.target.serial.value : null
        fail = e.target.fail.value ? e.target.fail.value : null
        owner = e.target.owner.value ? e.target.owner.value : null

        handleRegisterElectronicModule(
            orderNumber,
            brand,
            model,
            cylinders,
            transmission,
            year,
            engine,
            device,
            serial,
            fail,
            owner)
    }

    return (
        <>
         <section className='register-electronic-module'>
            <h3>Register Electronic Module</h3>
            {/* <button class="btn btn-light"onClick={()=>handleRegisterElectronicModuleShow()}>Close add electronic module</button> */}
            <form onSubmit={handleSubmit}>
                <div >
                    <div >
                        <label for="inputOrderNumber">Order Number</label>
                        <input type="text" name="orderNumber" id="inputOrderNumber" placeholder="ej. A-000" required/>
                    </div>
                    <div >
                        <label for="inputBrand">Brand</label>
                        <input type="text" name="brand" id="inputBrand" placeholder="ej. Dacia"/>
                    </div>    
                </div>
                <div>
                    <div >
                        <label for="inputModel">Model</label>
                        <input type="text" name="model" id="inputModel" placeholder="ej. Berlina"/>
                    </div>
                    <div >
                        <label for="inputCylinders">Cylinders</label>
                        <input type="text" name="cylinders" id="inputCylinders" />
                    </div>                        
                </div>
                <div >
                    <div >
                        <label for="inputTransmission">Transmission</label>
                        <select id="inputTransmission" name="transmission" >
                        <option selected></option>
                        <option>A</option>
                        <option>S</option>
                        <option>D</option>
                    </select>
                    </div>
                    <div>
                        <label for="inputYear">Year</label>
                        <input type="text" name="year" id="inputYear" placeholder="ej. 2000"/>
                    </div>            
                </div>
                <div > 
                    <div >
                        <label for="inputEngine">Engine</label>
                        <input type="text" name="engine" id="inputEngine"/>
                    </div>   
                    <div >
                        <label for="inputDevice">Device</label>
                        <input type="text" name="device" id="inputDevice"/>
                    </div>                    
                </div>
                <div>
                    <div >
                        <label for="inputSerial">Serial</label>
                        <input type="text" name="serial" id="inputSerial"/>
                    </div>  
                    <div >
                        <label for="inputFail">Fail</label>
                        <input type="text" name="fail" id="inputFail"/>
                    </div>                       
                </div>
                <div style={{display:"none"}}>
                    <div>
                        <label for="inputOwner">Owner</label>
                        <input type="text" name="owner" value={ownerId} id="inputOwner" onChange/>
                    </div>  
                    <div >
                        <label for="inputStatus">Status</label>
                        <input type="text" id="inputStatus"/>
                    </div>                       
                </div>

                <button type="submit" class="btn btn-light" >Submit</button>
                <span>{error}</span>
            </form>
        </section>
        </>
    )
}

export default RegisterElectronicModule


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register