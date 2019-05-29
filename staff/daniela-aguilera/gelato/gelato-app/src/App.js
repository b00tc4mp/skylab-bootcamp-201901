// import Logo from './components/Logo'
// import Button from './components/Button'
import { Home } from './pages/Home/index'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'

export function App () {
  return (
    <div className='App'>

      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route component={NotFound} />
      </Switch>

      {/* <Logo />
        <Button secondary={true} onClick={() => alert('order now')}>Order now!</Button>
        <Button tertiary={true} onClick={() => alert('login')}>Login!</Button>
        <Button light onClick={() => alert('register')}>Register!</Button>
        <Button onClick={() => alert('cerrar sesion')}>Cerrar sesión</Button>
        <Button disabled onClick={() => alert('cerrar sesion')}>Cerrar sesión</Button> */}
    </div>
  )
}
