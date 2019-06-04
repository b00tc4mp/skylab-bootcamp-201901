import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

export default function StripePayament({onTokenSucces, cart}) {
    const onToken = (token) => {
      debugger
      console.log(token)
      onTokenSucces(token)
    }
    
    // Check https://www.npmjs.com/package/react-stripe-checkout to see all props accepted!
    // Fake CC 4242 4242 4242 4242 Expiray date and CVC up to you!

    return (
      <StripeCheckout
        email="info@gelato.com"
        description="Helado de 3 Bolas"
        name="Gelato"
        token={onToken}
        stripeKey="pk_test_O7FBNQHITGbDbRD7Ix7fgXY6"
        amount={cart*100}
        currency="EUR"
        alipay
        bitcoin
        allowRememberMe='false'
      />
    )
      
}