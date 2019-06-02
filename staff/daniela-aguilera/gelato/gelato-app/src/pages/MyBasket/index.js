import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { Link } from 'react-router-dom'

export function MyBasket () {
  const [orders, setOrders] = useState([])

  useEffect(function () {
    async function getOrders () {
      const results = await logic.retrieveUserOrders()
      setOrders(results)
    }
    getOrders()
  }, [])

  const renderResultsRender = () => (
    <div>
      {
        orders.map(function (order) {
          return (
            <div key={order.id}>
              <h2>Flavors: {order.flavors.join(', ')}</h2>
              <h2>Price: {order.totalPrice} $</h2>
              <small>{order.size}</small>
              <h3>Status: {order.status}</h3>
              <Link />
            </div>
          )
        })
      }
    </div>
  )

  return (
    <section>
      {renderResultsRender()}
    </section>
  )
}
