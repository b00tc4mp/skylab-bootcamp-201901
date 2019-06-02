import React, { useEffect, useState } from 'react'
import logic from '../../logic'

export function Order ({ match }) {
  const [order, setOrder] = useState([])

  const { params } = match
  const { orderId } = params

  useEffect(function () {
    async function getOrder () {
      let result = await logic.retrieveOneOrder(orderId)
      setOrder(result)
    }
    getOrder()
  }, [])

  const renderOrder = () => {
    return (
      <div>
        <h1><strong>Client's order</strong></h1>
        {
          order.map(function (detail) {
            return (
              <div>
                <h2>Flavors: {detail.flavors.join(', ')}</h2>
                <h2>Type: {detail.type}</h2>
                <h2>Size: {detail.size}</h2>
                <h2>Status: {detail.status}</h2>
              </div>
            )
          })
        }
      </div>
    )
  }

  return <div>{renderOrder()}</div>
}
