import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import './index.sass'

function Checkout({ onTokenSuccess, email, total , card}) {

    const onToken = (token) => {
        onTokenSuccess(token)
    }



    return (
        <>
            <StripeCheckout
                email={email}
                description='Best breakfast ever!'
                name='MyBreak APP'
                token={onToken}
                stripeKey="pk_test_O7FBNQHITGbDbRD7Ix7fgXY6"
                amount={total * 100}
                currency="EUR"
                alipay
                bitcoin
                allowRememberMe='false'
            />
        </>
    )
}

export default Checkout