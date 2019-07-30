import React, {useState} from 'react'
import './index.sass'
import RegisterElectronicModule from '../Register-electronic-module'


function NewCustomer ({newCustomer, handleRegisterElectronicModule, handleCustomerDetail, error}) {
    const [registerElectronicModule, setRegisterElectronicModule] = useState(false)
    const handleRegisterElectronicModuleShow = (id) => {
        setRegisterElectronicModule(!registerElectronicModule)
    }

    const handleRegisterElectronicModuleInCustomers = async (...args) => {
        await handleRegisterElectronicModule(...args)
        setRegisterElectronicModule(!registerElectronicModule)
    }

    const {id, name, surname, phone, address, nid, email} = newCustomer

    return (
        <>
         <section className="new-customer">
            <span onClick={() => handleCustomerDetail(id)}>
            <h3> &nbsp; New customer</h3>
                {name && <span> &nbsp; {name} {surname} &nbsp; </span>}
                {/* {id && <span>id: {id} &nbsp; </span>} */}
                {/* {name && <span>Name: {name} &nbsp; </span>} */}
                {/* {surname && <span>Surname: {surname} &nbsp; </span>} */}
                {/* {phone && <span>Phone: {phone} &nbsp; </span>} */}
                {/* {address && <span>Address: {address} &nbsp; </span>} */}
                {/* {nid && <span>Nid: {nid} &nbsp; </span>} */}
                {/* {email && <span>Email: {email} &nbsp; </span>} */}
            </span>
            <button class="btn btn-light" onClick={()=>handleRegisterElectronicModuleShow(id)}>Add electronic module</button>
            {registerElectronicModule && <RegisterElectronicModule 
                ownerId={id} 
                handleRegisterElectronicModule={handleRegisterElectronicModuleInCustomers} 
                handleRegisterElectronicModuleShow={handleRegisterElectronicModuleShow} 
                error={error}/> }
    </section>
        </>
    )
}

export default NewCustomer


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register