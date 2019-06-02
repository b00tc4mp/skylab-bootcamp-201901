import React from 'react'
import { Redirect } from 'react-router-dom'
import logic from '../../logic'
import { OrderForm } from '../../components/OrderForm'

export function Order () {
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
