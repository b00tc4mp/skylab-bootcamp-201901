import React from 'react'
import { Link } from 'react-router-dom'
import { Events } from '../../components/Events'

export function Home () {
  return (
    <div>
      <div className='g-Home-cta'>
        <h1 className='title'>Make your own gelato!</h1>
        <Link className='button is-primary is-large' to='/create-your-order'>
          <strong>Order now!</strong>
        </Link>
      </div>
      <Events />
      <div />
    </div>
  )
}
