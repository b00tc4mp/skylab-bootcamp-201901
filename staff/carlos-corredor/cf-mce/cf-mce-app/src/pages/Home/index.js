import React, { useState, useEffect } from 'react';
import './index.sass'
import RegisterCustomer from '../../components/Register-customer';
import Customers from '../../components/Customers';
import NewCustomer from '../../components/New-customer'
import ElectronicModules from '../../components/Electronic-modules'
import CustomerDetail from '../../components/Customer-detail'
import Space4 from '../../components/Space-4'
// import ElectronicModuleDetail from '../../components/'


function Home({
    error,
    handleLogout,
    handleRegisterCustomer,
    handleRegisterCustomerShow,
    handleNewCustomerShow,
    handleCustomerDetailShow,
    NewCustomerShow,
    registerCustomer,
    customers,
    newCustomer,
    electronicModules,
    handleListCustomers,
    handleCustomerDetail,
    customerDetail,
    customerDetailShow,
    handleRegisterElectronicModule,
    handleListElectronicModules,
    customerNotes,
    handleAddCustomerNote,
    handleAddCustomerNoteShow,
    addNote,
    customerElectronicModules,
    handleElectronicModuleDetailShow,
    electronicModuleDetailShow,
    electronicModuleDetail}) {

    // const [registerCustomer, setRegisterCustomer] = useState(false)
    const [customersShow, setCustomersShow] = useState(false)
    const [electronicModulesShow, setElectronicModulesShow] = useState(false)
    
    const handleCustomersShow = () => {
        setCustomersShow(!customersShow)
        if(electronicModulesShow) setElectronicModulesShow(false)
    }

    const handleElectronicModulesShow = () => {
        setElectronicModulesShow(!electronicModulesShow)
        if(customersShow) setCustomersShow(false)
    }


    // const handleRegisterCustomerHome = async (...args) => {
    //     await handleRegisterCustomer(...args)
    //     setRegisterCustomer(!registerCustomer)
    // }

      useEffect( () => {
        handleListCustomers()
        handleListElectronicModules()
      }, [])

    return (
        <section className='home'> 
            <Space4 />
                <div class="form-row">
                    <div class="form-group col-md-0.5"></div>
                    <div class="form-group col-md-2">
                        <button class="btn btn-light"  onClick={handleLogout}>Logout</button>
                    </div>
                    <div class="form-group col-md-7">
                        <h1>Flow Control of Electronic Control Modules</h1>
                    </div>
                    <div class="form-group col-md-1"><img src="memory-rom.png" width="100" height="100" alt="chip"></img></div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-0.5"></div>
                    <div class="form-group col-md-5">
                        <h1>Hello {sessionStorage.user}!</h1>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-0.5"></div>
                    <div class="form-group col-md-1.2">
                        <button class="btn btn-light"  onClick={handleCustomersShow}>Customers</button>
                    </div>
                    <div class="form-group col-md-5">
                        <button class="btn btn-light"  onClick={handleElectronicModulesShow}>Electronic Modules</button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-0.5"></div>
                    <div class="form-group col-md-1.2">
                        <button class="btn btn-light"  onClick={handleRegisterCustomerShow}>Add customer</button>
                    </div>
                    <div class="form-group col-md-5">
                        <button class="btn btn-light"  onClick={handleNewCustomerShow}>Hide new Customer</button>
                    </div>
                </div>
            
                
            
            
            {newCustomer && NewCustomerShow && <NewCustomer newCustomer={newCustomer} handleRegisterElectronicModule={handleRegisterElectronicModule} handleCustomerDetail={handleCustomerDetail} error={error}/>}
            {registerCustomer && <RegisterCustomer handleRegisterCustomer={handleRegisterCustomer} error={error}/>}
            {customerDetail && customerDetailShow && <CustomerDetail customerDetail={customerDetail} handleRegisterElectronicModule={handleRegisterElectronicModule} handleCustomerDetailShow={handleCustomerDetailShow} customerNotes={customerNotes} handleAddCustomerNoteShow={handleAddCustomerNoteShow} addNote={addNote} handleAddCustomerNote={handleAddCustomerNote} customerElectronicModules={customerElectronicModules} handleElectronicModuleDetailShow={handleElectronicModuleDetailShow} electronicModuleDetailShow={electronicModuleDetailShow} electronicModuleDetail={electronicModuleDetail} error={error}/>}
            {customersShow && customers  && <Customers customers={customers} handleRegisterElectronicModule={handleRegisterElectronicModule} handleCustomerDetail={handleCustomerDetail} error={error}/>}
            {electronicModulesShow && electronicModules && <ElectronicModules electronicModules={electronicModules} handleCustomerDetail={handleCustomerDetail} error={error}/>}
        </section>
       

    )
}

export default Home
