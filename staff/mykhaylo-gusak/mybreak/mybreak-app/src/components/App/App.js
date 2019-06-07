import React, { useState, useEffect } from 'react';

import Header from '../Header'
import Home from '../../pages/Home'
import Footer from '../Footer'
import Landing from '../../pages/Landing'
import NotFound from '../../pages/NotFound'

import { Switch, Route, Redirect } from 'react-router-dom'

import logic from '../../logic'

function App() {

  const [user, setUser] = useState(false);
  const [showRetrieveUser, setRetrieveUser] = useState(false);
  const [userMenu, setMenu] = useState(false);
  const [userCard, setCard] = useState(false);
  const [total, setTotal] = useState(0)

  const [order, setOrder] = useState(false)
  const [orderError, setOrderError] = useState(false)

  const handleAddCard = async (id) => {
    await logic.cardUpdate(id)
    handleRetrieveUser()
  }

  const handleRetrieveUser = async () => {
    try {
      const _user = await logic.retrieveUser()
      setUser(_user)
    } catch (err) {
      setRetrieveUser(err.message)
    }
  }

  useEffect(() => {
    return (async () => {
      try {
        const _user = await logic.retrieveUser()
        setUser(_user)
      } catch (err) {
        setRetrieveUser(err.message)
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
      setMenu(true)
      setCard(false)
    }
    else setMenu(false)
  }
  const handleCloseMenu = () => setMenu(false)

  const handleOpenCard = () => {
    if (!userCard) {
      setCard(true)
      setMenu(false)
    }
    else setCard(false)
  }

  const handleAddOrder = async () => {
    try {
      await logic.addOrder('calle bla bla')
      setOrder(true)
    } catch (err) {
      setOrderError(err.message)
    }

  }

  const handleCloseCard = () => setCard(false)

  return (
    <>
      <Header showRetrieveUser={showRetrieveUser} user={user} handleRetrieveUser={handleRetrieveUser} handleOpenCard={handleOpenCard} handleOpenMenu={handleOpenMenu} />
      <Switch>
        <Route exact path='/' render={() => !logic.isUserLoggedIn ? <Landing /> : <Redirect to='/home' />} />
        <Route exact path='/home' render={() => logic.isUserLoggedIn ? <Home user={user} handleAddCard={handleAddCard} logOut={logOut} userMenu={userMenu} userCard={userCard} handleCloseMenu={handleCloseMenu} handleCloseCard={handleCloseCard} total={total} setTotal={setTotal} order={order} handleAddOrder={handleAddOrder} /> : <Redirect to='/' />} />
      </Switch>
      <Footer />
    </>
  );

}

export default App