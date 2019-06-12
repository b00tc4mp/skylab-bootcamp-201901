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
        <Route exact path='/my-basket' component={MyBasket} />
        <Route exact path='/orders/:orderId' component={Order} />
        <Route exact path='/user/profile' component={UserProfile} />
        <Route exact path='/store/orders' component={StoreOrders} />
        <Route exact path='/store/event' component={StoreCreateEvent} />
        <Route exact path='/store/map' component={MapStore} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  )
}
