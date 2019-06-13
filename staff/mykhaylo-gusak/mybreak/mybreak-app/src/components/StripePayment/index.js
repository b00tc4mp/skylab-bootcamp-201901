import React, { useState, useEffect } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import './index.sass'

function StripePayment({ onTokenSucces, email, total, card }) {

    const [error, setError] = useState(false)

    const onToken = (token) => {
        onTokenSucces(token)
    }

    useEffect(() => {
        if (card.length < 1) setError(true)
    }, [])

    return (
        <>{!error ?
            <StripeCheckout
                email={email}
                description='Best breakfast ever!'
                name='MyBreak APP'
                token={onToken}
                stripeKey="pk_test_O7FBNQHITGbDbRD7Ix7fgXY6"
                amount={total.toFixed(2) * 100}
                currency="EUR"
                alipay
                bitcoin
                allowRememberMe='true'
            />
            :
            <h2>Please, choose at least one product.</h2>
        }
        </>
    )
}

export default StripePayment