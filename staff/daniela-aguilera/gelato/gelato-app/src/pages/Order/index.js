import React, { useEffect, useState } from 'react'
import logic from '../../logic'

export function Order ({ match }) {
  const [order, setOrder] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const { params } = match
  const { orderId } = params

  useEffect(function () {
    async function getOrder () {
      try {
        let result = await logic.retrieveOneOrder(orderId)
        setOrder(result)
      } catch (error) {
        setErrorMessage(error.message)
      }
    }

    getOrder()
  }, [orderId])

  const renderOrder = () => {
    return (
      <div className='content'>
        {
          order.map(function (detail, idx) {
            return (
              <article key={idx} className='g-Order2'>
                <h1>Your <span>client</span> ordered this gelato:</h1>
                <div className='g-Order2-content'>
                  <p><span>Flavors:</span> {detail.flavors.join(', ')}</p>
                  <p><span>Type: </span>{detail.type}</p>
                  <p><span>Size:</span> {detail.size}</p>
                  <p><span>Status:</span> {detail.status}</p>
                </div>

              </article>
            )
          })
        }
      </div>
    )
  }

  return (
    <div>
      {order && <div>{renderOrder()}</div>}
      {errorMessage && <div>Lo siento, esta orden no existe.</div>}
    </div>
  )
}
