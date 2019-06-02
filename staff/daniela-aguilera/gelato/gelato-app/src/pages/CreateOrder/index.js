import React from 'react'
import { Redirect } from 'react-router-dom'
import logic from '../../logic'
import { OrderForm } from '../../components/OrderForm'

export function CreateOrder () {
  if (logic.isUserLoggedIn) {
    return (
      <div>
        <OrderForm />
      </div>
    )
  } else {
    return (
      <Redirect to='/register' />
    )
  }
}
