import React from 'react'
import './index.sass'


function CustomerElectronicModule ({electronicModules, error}) {

    return (
        <>
         <section className='customer-electronic-module'>
         <h3>Electronics modules</h3>
            <ul>
            {
                electronicModules.map(({ 
                    id,
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
                    owner,
                    status,
                    received,
                    reviewed,
                    budgeted,
                    approved,
                    repaired,
                    delivered,
                    toCollect,
                    collected }) =>{

                    return <li key={id} >
                        <span onClick={() => alert(id)}>
                            {/* <span>id: {id} &nbsp; </span> */}
                            <span>orderNumber: {orderNumber} &nbsp; </span>
                            {/* <span>brand: {brand} &nbsp; </span>
                            <span>model: {model} &nbsp; </span>
                            <span>cylinders: {cylinders} &nbsp; </span>
                            <span>transmission: {transmission} &nbsp; </span>
                            <span>year: {year} &nbsp; </span>
                            <span>engine: {engine} &nbsp; </span>
                            <span>device: {device} &nbsp; </span>
                            <span>serial: {serial} &nbsp; </span>
                            <span>fail: {fail} &nbsp; </span>
                            <span>owner: {owner} &nbsp; </span> */}
                            <span>status: {status} &nbsp; </span>
                            <span>received: {received} &nbsp; </span>
                            {/* <button onClick={()=>handleRegisterElectronicModuleShow(id)}>Add electronic module</button> */}
                        </span>
                    </li>
                })
            }
        </ul>
        </section>
        </>
    )
}

export default CustomerElectronicModule


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register