import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logic from '../../logic'
import QRious from 'qrious'
import { Modal } from '../../components/Modal'

export function MyBasket () {
  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState(null)

  useEffect(function () {
    async function getOrders () {
      const results = await logic.retrieveUserOrders()
      setOrders(results)
    }
    getOrders()
  }, [])

  const handleCloseModal = () => {
    setOrderId(null)
  }

  const renderQR = () => {
    const { host, protocol } = window.location

    const qr = new QRious({
      size: 300,
      value: `${protocol}//${host}/orders/${orderId}`
    })

    return <img src={qr.toDataURL()} />
  }

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
              <button
                className='button is-primary'
                onClick={() => setOrderId(order.id)}>
                  Show QR Code
              </button>
              <Link className='button is-info' to={`/orders/${order.id}`}>Go to order</Link>
            </div>
          )
        })
      }
      {orderId !== null && <Modal onClose={handleCloseModal}>
        <div className='g-Qr-Code'>
          {renderQR()}
        </div>
      </Modal>
      }
    </div>
  )

  return (
    <section>
      {renderResultsRender()}
    </section>
  )
}
