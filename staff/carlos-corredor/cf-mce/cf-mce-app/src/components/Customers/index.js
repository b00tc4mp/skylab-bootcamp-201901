import React, {useState} from 'react'
import './index.sass'
import RegisterElectronicModule from '../Register-electronic-module'
import Title1 from '../Title-1'
import Space4 from '../Space-4'
import Box1 from '../Box-1'

function Customers ({customers, handleRegisterElectronicModule, handleCustomerDetail, error}) {

    
    const [registerElectronicModule, setRegisterElectronicModule] = useState(false)
    const [ownerId, setOwnerId] = useState()

    const handleRegisterElectronicModuleShow = (id) => {
        if(!registerElectronicModule) {
            setOwnerId( id )
            setRegisterElectronicModule(true)
        }
                
        if(registerElectronicModule) {
            setOwnerId( null )
            setRegisterElectronicModule(false)
        }
        
    }

    const handleRegisterElectronicModuleInCustomers = async (...args) => {
        await handleRegisterElectronicModule(...args)
        setRegisterElectronicModule(!registerElectronicModule)

    }
    return <section className="customers">
        <Space4 />
        <Title1 title1={'Customers'}/>

            
            <ul>
            {
                customers.map(({ id, name, surname, phone, address, nid, email }) =>{
                    
                    return <section>
                        <li key={id} >
                            <span onClick={() => handleCustomerDetail(id)}>
                                {/* {id && <span>id: {id} &nbsp; </span>} */}
                                {name && <Box1 text1={name} text2={surname} />}
                                {/* {phone && <span>Phone: {phone} &nbsp; </span>} */}
                                {/* {address && <span>Address: {address} &nbsp; </span>} */}
                                {nid && <Box1 text1={'Nid:'} text2={nid} />}
                                {/* {nid && <span>Nid: {nid} &nbsp; </span>} */}
                                {/* {email && <span>Email: {email} &nbsp; </span>} */}
                            </span>
                            <button class="btn btn-light" onClick={()=>handleRegisterElectronicModuleShow(id)}>Add electronic module</button>
                    {(ownerId === id) ? registerElectronicModule && <RegisterElectronicModule ownerId={ownerId} handleRegisterElectronicModule={handleRegisterElectronicModuleInCustomers} handleRegisterElectronicModuleShow={handleRegisterElectronicModuleShow} error={error}/> : <span/> }
                        </li>
                        <Space4 />
                    </section>
                })
            }
        </ul>
    </section>
}

export default Customers
// <li key={id} onClick={() => alert(id)}>

// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register