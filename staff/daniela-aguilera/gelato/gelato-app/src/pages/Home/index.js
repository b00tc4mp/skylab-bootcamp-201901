import React from 'react'
import { Link } from 'react-router-dom'

export function Home () {
  return (
    <div>
      <div className='g-Home-cta' src='/gelato-home.jpeg'>
        <h1 className='title'>Make your own gelato!</h1>
        <Link className='button is-primary' to='/create-your-order'>
          <strong>Order now!</strong>
        </Link>
      </div>
    </div>
  )
}
