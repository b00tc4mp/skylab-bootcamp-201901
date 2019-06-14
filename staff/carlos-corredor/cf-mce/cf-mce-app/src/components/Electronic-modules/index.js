import React from 'react'
import './index.sass'
import Space4 from '../Space-4'
import Title1 from '../Title-1'
import Box1 from '../Box-1'


function ElectronicModules ({electronicModules, handleCustomerDetail, error}) {
    return <section className="electronic-modules">
        <Space4 />
        <Title1 title1={'Electronics modules'}/>
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
                        <span onClick={() => handleCustomerDetail(owner)}>
                            {/* <span>id: {id} &nbsp; </span> */}
                            {/* <span>orderNumber: {orderNumber} &nbsp; </span> */}
                            <Box1 text1={'Order Number:'} text2={orderNumber} />
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
                            {/* <span>received: {received} &nbsp; </span> */}
                            <Box1 text1={'received:'} text2={received} />
                            {/* <span>status: {status} &nbsp; </span> */}
                            <Box1 text1={'status:'} text2={status} />
                            {/* <button onClick={()=>handleRegisterElectronicModuleShow(id)}>Add electronic module</button> */}
                        </span>
                    </li>
                })
            }
        </ul>
    </section>
}

export default ElectronicModules

// {(id === status)? <span>orderNumber: {orderNumber} &nbsp; </span> : <p>hola</p>}
// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register