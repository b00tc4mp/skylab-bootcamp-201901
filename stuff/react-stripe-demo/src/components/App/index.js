import React, {useState} from 'react';
import './index.css';
import StripePayment from '../StripePayment'

export default function App() {

  const [cart, setCart] = useState(0)

  const handlePurchase = () => {
    alert('Payment received!')
  }

  return (
    <>
      <input onChange={e => setCart(e.target.value)}/>
      <StripePayment onTokenSucces={handlePurchase} cart={cart}/>
    </>
  )
}

