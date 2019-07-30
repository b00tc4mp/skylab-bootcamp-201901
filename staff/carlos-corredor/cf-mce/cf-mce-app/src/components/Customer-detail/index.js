import React, {useState} from 'react'
import './index.sass'
import RegisterElectronicModule from '../Register-electronic-module'
import AddNote from '../Add-note'
import ElectronicModulesDetail from '../Electronic-modules-detail';
import ListNotes from '../List-notes'
import Box1 from '../Box-1'


function CustomerDetail ({customerDetail: {id, name, surname, phone, address, nid, email}, handleRegisterElectronicModule, handleCustomerDetailShow, customerNotes, handleAddCustomerNoteShow, addNote, handleAddCustomerNote, customerElectronicModules, handleElectronicModuleDetailShow, electronicModuleDetailShow, electronicModuleDetail, error}) {
    const [registerElectronicModule, setRegisterElectronicModule] = useState(false)
    const handleRegisterElectronicModuleShow = (id) => {
        setRegisterElectronicModule(!registerElectronicModule)
    }

    const handleRegisterElectronicModuleInCustomers = async (...args) => {
        await handleRegisterElectronicModule(...args)
        setRegisterElectronicModule(!registerElectronicModule)
    }

    return (
        <>
         <section className="customer-detail">
            
            <h3>Customer {name} {surname} detail</h3>
            <button class="btn btn-light" onClick={()=>handleCustomerDetailShow()}>Hide detail</button>
            <div class="form-row">
                <div class="form-group col-md-0.5"></div>
                <div class="form-group col-md-3">{name && <Box1 text1={'Name:'} text2={name} />}</div>
                <div class="form-group col-md-0.5"></div>
                <div class="form-group col-md-3">{surname && <Box1 text1={'Surname:'} text2={surname} />}</div>
                <div class="form-group col-md-0.5"></div>
                <div class="form-group col-md-3">{phone && <Box1 text1={'Phone:'} text2={phone} />}</div>
                <div class="form-group col-md-0.5"></div>
                <div class="form-group col-md-3">{address && <Box1 text1={'Address:'} text2={address} />}</div>
                <div class="form-group col-md-0.5"></div>
                <div class="form-group col-md-3">{nid && <Box1 text1={'Nid:'} text2={nid} />}</div>
                <div class="form-group col-md-0.5"></div>
                <div class="form-group col-md-3">{email && <Box1 text1={'Email:'} text2={email} />}</div>
            </div>
            {/* {id && <span>id: {id} &nbsp; </span>} */}
            {/* {name && <span>Name: {name} &nbsp; </span>} */}
            {/* {surname && <span>Surname: {surname} &nbsp; </span>}
            {phone && <span>Phone: {phone} &nbsp; </span>}
            {address && <span>Address: {address} &nbsp; </span>}
            {nid && <span>Nid: {nid} &nbsp; </span>}
            {email && <span>Email: {email} &nbsp; </span>} */}
            <button class="btn btn-light" onClick={()=>handleRegisterElectronicModuleShow(id)}>Add electronic module</button>
            {registerElectronicModule && <RegisterElectronicModule 
                ownerId={id} 
                handleRegisterElectronicModule={handleRegisterElectronicModuleInCustomers} 
                handleRegisterElectronicModuleShow={handleRegisterElectronicModuleShow} 
                error={error}/> }
            <button class="btn btn-light" onClick={()=>handleAddCustomerNoteShow(id)}>Add note</button>
            {addNote && <AddNote handleAddNote={handleAddCustomerNote} id={id} error={error}/>}
            <ListNotes customerNotes={customerNotes} />
            {customerElectronicModules && <ElectronicModulesDetail electronicModules={customerElectronicModules} handleElectronicModuleDetailShow={handleElectronicModuleDetailShow} show={electronicModuleDetailShow} electronicModuleId={electronicModuleDetail} error={error}/>}

        </section>
        </>
    )
}

export default CustomerDetail



// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register