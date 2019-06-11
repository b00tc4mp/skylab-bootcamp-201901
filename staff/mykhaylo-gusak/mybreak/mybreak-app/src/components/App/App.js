import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import Header from '../Header'
import Home from '../../pages/Home'
import Footer from '../Footer'
import Landing from '../../pages/Landing'
import logic from '../../logic'
import Terminal from '../Terminal'

function App() {

  const [user, setUser] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const [userCard, setUserCard] = useState(false)
  const [card, setCard] = useState(false)
  const [orders, setOrders] = useState(false)
  const [orderError, setOrderError] = useState(false)
  const [newOrder, setNewOrder] = useState(false)

  const handleAddCard = async (id) => {
    await logic.cardUpdate(id)
    handleRetrieveUser()
  }

  const handleRetrieveUser = () => {
    return (async () => {
      try {
        const _user = await logic.retrieveUser()
        setUser(_user)
      } catch (err) {
        setUser(err.message)
      }
    })()
  }

  const handleAddOrder = () => {
    return (async () => {
      try {
        const { id } = await logic.addOrder('ubication')
        if (id) setNewOrder(id)
        handleRetrieveUser()
        handleUpdateMyOrders()
      } catch (err) {
        setOrderError(err.message)
      }
    })()
  }

  const handleUpdateMyOrders = () => {
    return (async () => {
      const _orders = await logic.retrieveMyOrders()
      setOrders(_orders)
    })()
  }

  useEffect(() => {
    return (async () => {
      try {
        const _user = await logic.retrieveUser()
        setUser(_user)
        handleUpdateMyOrders()
      } catch (err) {
        setUser(err.message)
      }
    })()
  }, [])

  const logOut = () => {
    logic.logOut()
    setUser(false)
    window.location.href = '/'
  }

  const handleOpenMenu = () => {
    if (!userMenu) {
      setUserMenu(true)
      setUserCard(false)
    }
    else setUserMenu(false)
  }

  const handleCloseMenu = () => setUserMenu(false)

  const handleOpenCard = () => {
    if (!userCard) {
      setUserCard(true)
      setUserMenu(false)
    }
    else setUserCard(false)
  }

  const handleCloseCard = () => setUserCard(false)

  return (
    <>
      <Header user={user} handleRetrieveUser={handleRetrieveUser} handleOpenCard={handleOpenCard} handleOpenMenu={handleOpenMenu} />
      <Route exact path='/' render={() => !logic.isUserLoggedIn ? <Landing /> : <Redirect to='/home' />} />
      <Route exact path='/home' render={() => logic.isUserLoggedIn ? <Home user={user} handleUpdateMyOrders={handleUpdateMyOrders} handleAddCard={handleAddCard} handleAddOrder={handleAddOrder} logOut={logOut} userMenu={userMenu} userCard={userCard} handleCloseMenu={handleCloseMenu} handleCloseCard={handleCloseCard} orders={orders} newOrder={newOrder} /> : <Redirect to='/' />} />
      <Route exact path='/order/:id' render={() => !logic.isUserLoggedIn && <Terminal />} />
      <Footer />
    </>
  );

}

export default App