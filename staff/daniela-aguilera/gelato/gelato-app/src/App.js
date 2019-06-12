// import Logo from './components/Logo'
// import Button from './components/Button'
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { CreateOrder } from './pages/CreateOrder'
import { Footer } from './components/Footer'
import { Home } from './pages/Home/index'
import { Login } from './pages/Login'
import { MyBasket } from './pages/MyBasket'
import { NavBar } from './components/NavBar'
import { NotFound } from './pages/NotFound'
import { Order } from './pages/Order'
import { Payment } from './pages/Payment'
import { Register } from './pages/Register'
import { UserProfile } from './pages/UserProfile'
import { StoreOrders } from './pages/StoreOrders'
import { StoreCreateEvent } from './pages/StoreCreateEvent'
import { MapStore } from './pages/MapStore'

export function App () {
  return (
    <div className='App'>
      <NavBar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/create-your-order' component={CreateOrder} />
        <Route exact path='/payment' component={Payment} />
        <Route exact path='/my-basket' component={MyBasket} />
        <Route exact path='/orders/:orderId' component={Order} />
        <Route exact path='/user/profile' component={UserProfile} />
        <Route exact path='/store/orders' component={StoreOrders} />
        <Route exact path='/store/event' component={StoreCreateEvent} />
        <Route exact path='/store/map' component={MapStore} />
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
