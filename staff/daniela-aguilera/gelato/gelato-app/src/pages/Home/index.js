import React from 'react'
import NavBar from '../../components/NavBar'
import Logo from './logo.svg'

export function Home () {
  return (
    <div>
      <NavBar />
      <div>
        <a href='https://bulma.io'>
          <img src={Logo} width='112' height='28' />
        </a>
        <h1>Make your own gelato!</h1>
        <button className='button is-primary'><strong>Order now!</strong></button>
      </div>
    </div>
  )
}
