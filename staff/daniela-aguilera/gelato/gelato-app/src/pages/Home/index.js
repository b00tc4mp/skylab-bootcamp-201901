import React from 'react'
import { Link } from 'react-router-dom'
import { Events } from '../../components/Events'

export function Home () {
  return (
    <div>
      <div className='g-Home-cta'>
        <h1 className='title'>Make your own gelato!</h1>
        <Link className='button is-primary is-large' to='/create-your-order'>
          <span className='icon is-small'>
            <i className='fas fa-shopping-cart' />
          </span>
          <span>Order now!</span>
        </Link>
      </div>
      <Events />
      <div />
    </div>
  )
}
