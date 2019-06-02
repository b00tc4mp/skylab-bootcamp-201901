// import Logo from './components/Logo'
// import Button from './components/Button'
import { Home } from './pages/Home/index'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Order } from './pages/Order'
import { Payment } from './pages/Payment'
import { MyBasket } from './pages/MyBasket'
import { Qr } from './pages/Qr'

export function App () {
  return (
    <div className='App'>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/create-your-order' component={Order} />
        <Route exact path='/payment' component={Payment} />
        <Route exact path='/my-basket' component={MyBasket} />
        <Route exact path='/qr:id' component={Qr} />
        <Route component={NotFound} />
      </Switch>
      <Footer />

      {/* <Logo />
        <Button secondary={true} onClick={() => alert('order now')}>Order now!</Button>
        <Button tertiary={true} onClick={() => alert('login')}>Login!</Button>
        <Button light onClick={() => alert('register')}>Register!</Button>
        <Button onClick={() => alert('cerrar sesion')}>Cerrar sesión</Button>
        <Button disabled onClick={() => alert('cerrar sesion')}>Cerrar sesión</Button> */}
    </div>
  )
}
