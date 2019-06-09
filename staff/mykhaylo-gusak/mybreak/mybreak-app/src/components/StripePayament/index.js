import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

function StripePayament({ onTokenSucces, email, total }) {

    const onToken = (token) => {
        onTokenSucces(token)
        console.log(token)
        if (true) alert('dadde')
    }

    return (
        <>
            <StripeCheckout
                email={email}
                description="Helado de 3 Bolas"
                name="Gelato"
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

export default StripePayament