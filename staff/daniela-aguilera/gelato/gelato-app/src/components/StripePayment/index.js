import React, { useEffect, useState } from 'react'
import logic from '../../logic'
import StripeCheckout from 'react-stripe-checkout'

export default function StripePayament ({ onTokenSucces, cart, flavors }) {
  const [userEmail, setUserEmail] = useState(null)

  const onToken = (token) => {
    onTokenSucces(token)
  }

  useEffect(function () {
    async function getUser () {
      const user = await logic.retrieveUserBy()
      setUserEmail(user.email)
    }
    getUser()
  }, [])

  return (
    <StripeCheckout
      email={userEmail}
      description={flavors.join(', ')}
      name='Your Gelato:'
      token={onToken}
      stripeKey='pk_test_O7FBNQHITGbDbRD7Ix7fgXY6'
      amount={cart * 100}
      currency='USD'
      allowRememberMe
    />
  )
}
