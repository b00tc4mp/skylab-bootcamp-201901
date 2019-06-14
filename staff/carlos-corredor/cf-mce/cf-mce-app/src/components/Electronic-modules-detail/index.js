import React from 'react'
import './index.sass'
import Box1 from '../Box-1'

function ElectronicModulesDetail ({electronicModules, handleElectronicModuleDetailShow, show, electronicModuleId, error}) {
    return <section className="electronic-modules-detail">
        {/* {!electronicModules && <h3>Electronics modules</h3>} */}
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
                        <span onClick={() => handleElectronicModuleDetailShow(id)}>
                            {/* <span>id: {id} &nbsp; </span> */}
                            <Box1 text1={'Order Number:'} text2={orderNumber} />
                            <Box1 text1={'received:'} text2={received} />
                            <Box1 text1={'status:'} text2={status} />
                            {/* <span>orderNumber: {orderNumber} &nbsp; </span>
                            <span>owner: {owner} &nbsp; </span>
                            <span>status: {status} &nbsp; </span>
                            <span>received: {received} &nbsp; </span> */}
                            {(id === electronicModuleId) ? show && brand && <span>brand: {brand} &nbsp; </span> : <span/> }
                            {(id === electronicModuleId) ? show && model && <span>model: {model} &nbsp; </span> : <span/> }
                            {(id === electronicModuleId) ? show && cylinders &&<span>cylinders: {cylinders} &nbsp; </span> : <span/> }
                            {(id === electronicModuleId) ? show && transmission && <span>transmission: {transmission} &nbsp; </span> : <span/> }
                            {(id === electronicModuleId) ? show && year && <span>year: {year} &nbsp; </span> : <span/> }
                            {(id === electronicModuleId) ? show && engine && <span>engine: {engine} &nbsp; </span> : <span/> }
                            {(id === electronicModuleId) ? show && device && <span>device: {device} &nbsp; </span> : <span/> }
                            {(id === electronicModuleId) ? show && serial && <span>serial: {serial} &nbsp; </span> : <span/> }
                            {(id === electronicModuleId) ? show && fail && <span>fail: {fail} &nbsp; </span> : <span/> }
                            {/* <button onClick={()=>handleRegisterElectronicModuleShow(id)}>Add electronic module</button> */}
                        </span>
                    </li>
                })
            }
        </ul>
    </section>
}

export default ElectronicModulesDetail

// {(id === status)? <span>orderNumber: {orderNumber} &nbsp; </span> : <p>hola</p>}
// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register