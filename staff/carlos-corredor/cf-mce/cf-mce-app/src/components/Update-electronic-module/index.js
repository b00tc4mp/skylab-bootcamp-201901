import React from 'react'
import './index.sass'


function UpdateElectronicModule () {

    const handleDate = () => {
        const date = new Date
        return date = date.toDateString()
    }

    return (
        <>
         <section className='update-electronic-module'>
            <h1>Update Electronic Module component</h1>
            <form>
                <div >
                    <div >
                        <label for="inputOrderNumber">Order Number</label>
                        <input type="text" id="inputOrderNumber" placeholder="ej. A-000" required/>
                    </div>
                    <div >
                        <label for="inputBrand">Brand</label>
                        <input type="text" id="inputBrand" placeholder="ej. Dacia"/>
                    </div>    
                </div>
                <div>
                    <div >
                        <label for="inputModel">Model</label>
                        <input type="text" id="inputModel" placeholder="ej. Berlina"/>
                    </div>
                    <div >
                        <label for="inputCylinders">Cylinders</label>
                        <input type="text" id="inputCylinders" placeholder="Av. ..."/>
                    </div>                        
                </div>
                <div >
                    <div >
                        <label for="inputTransmission">Transmission</label>
                        <select id="inputTransmission" >
                        <option selected></option>
                        <option>A</option>
                        <option>S</option>
                        <option>D</option>
                    </select>
                    </div>
                    <div>
                        <label for="inputYear">Year</label>
                        <input type="text" id="inputYear" placeholder="ej. 2000"/>
                    </div>            
                </div>
                <div > 
                    <div >
                        <label for="inputEngine">Engine</label>
                        <input type="text" id="inputEngine"/>
                    </div>   
                    <div >
                        <label for="inputDevice">Device</label>
                        <input type="text" id="inputDevice"/>
                    </div>                    
                </div>
                <div>
                    <div >
                        <label for="inputSerial">Serial</label>
                        <input type="text" id="inputSerial"/>
                    </div>  
                    <div >
                        <label for="inputFail">Fail</label>
                        <input type="text" id="inputFail"/>
                    </div>                       
                </div>
                <div>
                    <div >
                        <label for="inputOwner">Owner</label>
                        <input type="text" id="inputOwner"/>
                    </div>  
                    <div >
                        <label for="inputStatus">Status</label>
                        <input type="text" id="inputStatus"/>
                    </div>                       
                </div>

                <div>
                    <div >
                        <label for="inputReceived">Received</label>
                        <input type="radio" id="inputReceived" value={handleDate}/>
                    </div>  
                    <div >
                        <label for="inputReviewed">Reviewed</label>
                        <input type="radio" id="inputReviewed" value={handleDate}/>
                    </div>                       
                </div>

                <div>
                    <div >
                        <label for="inputBudgeted">Budgeted</label>
                        <input type="radio" id="inputBudgeted" value={handleDate}/>
                    </div>  
                    <div >
                        <label for="inputApproved">Approved</label>
                        <input type="radio" id="inputApproved" value={handleDate}/>
                    </div>                       
                </div>

                <div>
                    <div >
                        <label for="inputRepaired">Repaired</label>
                        <input type="radio" id="inputRepaired" value={handleDate}/>
                    </div>  
                    <div >
                        <label for="inputDelivered">Delivered</label>
                        <input type="radio" id="inputDelivered" value={handleDate}/>
                    </div>                       
                </div>

                <div>
                    <div >
                        <label for="inputToCollect">ToCollect</label>
                        <input type="radio" id="inputToCollect" value={handleDate}/>
                    </div>  
                    <div >
                        <label for="inputCollected">Collected</label>
                        <input type="radio" id="inputCollected" value={handleDate}/>
                    </div>                       
                </div>

                <button type="submit" >Submit</button>
            </form>
        </section>
        </>
    )
}

export default UpdateElectronicModule


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register