import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Landing from '../pages/Landing';
import './App.css';
import Home from '../pages/Home'
import logic from '../logic'
import { validate, errors } from 'cf-mce-common';
// en prueba
import InTest from '../components/Find-customer'

const {LogicError} = errors

function App(props) {

  const [ change , setChange ] = useState(false)
  const [ error , setError ] = useState(null)
  const [ toLogin , setToLogin ] = useState(false)
  const [ customers , setCustomers ] = useState()
  const [ registerCustomer, setRegisterCustomer ] = useState(false)
  const [ newCustomer , setNewCustomer ] = useState()
  const [ NewCustomerShow , setNewCustomerShow ] = useState()
  const [ electronicModules , setElectronicModules ] = useState()
  const [ customerDetail , setCustomerDetail ] = useState(null)
  const [ customerDetailShow , setCustomerDetailShow ] = useState()
  const [ customerNotes , setCustomerNotes ] = useState()
  const [ addNote, setAddNote ] = useState(false)
  const [ customerElectronicModules, setCustomerElectronicModules ] = useState(false)
  const [ electronicModuleDetailShow, setElectronicModuleDetailShow ] = useState()
  const [ electronicModuleDetail , setElectronicModuleDetail ] = useState()

  const handleChange = () => {
    setChange(!change)
  }

const handleRegister = async (name, surname, email, password, category, passwordConfirm) => {
  try {
      if(password !== passwordConfirm) throw new LogicError("Passwords do not match")
      await logic.registerUser(name, surname, email, password, category)
      setToLogin(true)
      setError(null)
  } catch (error) {
    setError(error.message)
  }
}

const handleLogin = async (email, password) => {
  try {
      await logic.loginUser(email, password)
      const user = await logic.retrieveUser()
      handleChange()
      sessionStorage.user = user.name
      setError(null)
  } catch (error) {
    setError(error.message)
  }
}

const resetError = () => {
  setError(null)
}

const handleLogout = () => {
  logic.logOut()
  sessionStorage.user = null
  
  handleChange()
}

const handleRegisterCustomer = async (name, surname, phone, address, nid, email, text) => {
  try {
    validate.arguments([
      { name: 'text', value: text, type: 'string', notEmpty: true, optional: true }
  ])
	  await logic.registerCustomer(name, surname, phone, address, nid, email)
	  handleRegisterCustomerShow()
	  setNewCustomerShow(true)
    const customers = await logic.findCustomers()
    setCustomers(customers)
    const customer = await logic.findCustomers(undefined, undefined, undefined, undefined, undefined, nid, undefined)
    setNewCustomer(customer[0])
    setCustomerDetail(customer[0])
    await logic.addCustomerNote(customer[0].id, text)
    const notes = await logic.listCustomerNotes(customer[0].id)
    setCustomerNotes(notes)
    setError(null)
  
  } catch (error) {
    setError(error.message)
  }
}

const handleRegisterCustomerShow = () => {
	setRegisterCustomer(!registerCustomer)
}

const handleNewCustomerShow = () => {
	setNewCustomerShow(!NewCustomerShow)
}

const handleListCustomers = async () => {
  try {
      const customers = await logic.findCustomers()
      setCustomers(customers)
  } catch (error) {
    setError(error.message)
  }
}

const handleCustomerDetailShow = async () => {
	if(customerDetailShow) {
    setAddNote(false)
    setElectronicModuleDetailShow(false)
  }
	setCustomerDetailShow(!customerDetailShow)
  }

const handleAddCustomerNoteShow = (id) => {
  setAddNote(!addNote)
  if(addNote) setError(null)
}

const handleAddCustomerNote = async (customerId, text) => {
	try {
		await logic.addCustomerNote(customerId, text)
		const notes = await logic.listCustomerNotes(customerId)
    setCustomerNotes(notes)
    handleAddCustomerNoteShow()
		setError(null)
	
	} catch (error) {
	  setError(error.message)
	}
}

const handleRegisterElectronicModule = async (
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
      owner) => {
  try {
      const res = await logic.registerElectronicModule(
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
      const electronicModules = await logic.findElectronicModules()
      setElectronicModules(electronicModules)
      setError(null)
  
  } catch (error) {
    setError(error.message)
  }
}

const handleListElectronicModules = async () => {
  try {
      const electronicModules = await logic.findElectronicModules()
      setElectronicModules(electronicModules)
  } catch (error) {
    setError(error.message)
  }
}

const handleCustomerDetail = async (customerId) => {
	try {
		const customer = await logic.findCustomers(customerId)
		setCustomerDetail(customer[0])
		const notes = await logic.listCustomerNotes(customer[0].id)
    setCustomerNotes(notes)
    const customerElectronicModule = await logic.findElectronicModules(null, null, null, null, null, null, null, null, null, null, customer[0].id)
    setCustomerElectronicModules(customerElectronicModule)
		setCustomerDetailShow(true)
		setError(null)
		
	} catch (error) {
		setError(error.message)
	}
}

const handleElectronicModuleDetailShow = (electronicModuleId) => {
    if(electronicModuleDetailShow === electronicModuleId) setElectronicModuleDetailShow('')
    else {
      setElectronicModuleDetailShow('')
      setElectronicModuleDetail(electronicModuleId)
      setElectronicModuleDetailShow(electronicModuleId)
    }
  }



  return (
    <>
		<Switch>
			<Route path="/" exact render={() => logic.isUserLoggedIn ? 
				<Redirect to="/home" /> : 
        <Landing  handleRegister={handleRegister} 
              resetError={resetError} 
							error={error} 
							toLogin={toLogin} 
							handleLogin={handleLogin} /> }/>
			<Route path="/home" render={() => logic.isUserLoggedIn ? 
				<Home handleLogout={handleLogout} 
					handleRegisterCustomer={handleRegisterCustomer} 
					registerCustomer={registerCustomer} 
					handleRegisterCustomerShow={handleRegisterCustomerShow} 
					handleNewCustomerShow={handleNewCustomerShow} 
					NewCustomerShow={NewCustomerShow} 
					customers={customers} 
					handleListCustomers={handleListCustomers} 
					newCustomer={newCustomer} 
					handleCustomerDetailShow={handleCustomerDetailShow} 
					customerDetailShow={customerDetailShow} 
					electronicModules={electronicModules} 
					handleRegisterElectronicModule={handleRegisterElectronicModule} 
					handleListElectronicModules={handleListElectronicModules} 
					handleCustomerDetail={handleCustomerDetail} 
					customerDetail={customerDetail} 
					handleAddCustomerNote={handleAddCustomerNote} 
					customerNotes={customerNotes} 
					handleAddCustomerNoteShow={handleAddCustomerNoteShow} 
          addNote={addNote} 
          customerElectronicModules={customerElectronicModules} 
          handleElectronicModuleDetailShow={handleElectronicModuleDetailShow} 
          electronicModuleDetailShow={electronicModuleDetailShow} 
          electronicModuleDetail={electronicModuleDetail} 
					error={error}/> : 
				<Redirect to="/" /> }/>
			<Route path="/test" render={() => true && <InTest  /> }/>
			<Redirect to="/" />
		</Switch>
    </>  
  );
}

export default App;
