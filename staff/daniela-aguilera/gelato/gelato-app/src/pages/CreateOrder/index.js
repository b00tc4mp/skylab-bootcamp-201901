import React from 'react'
import { Redirect } from 'react-router-dom'
import logic from '../../logic'
import { OrderForm } from '../../components/OrderForm'

export function CreateOrder () {
  if (logic.isUserLoggedIn) {
    return (
      <section className='g-Layout'>
        <OrderForm />
      </section>
    )
  } else {
    return (
      <Redirect to='/register' />
    )
  }
}
