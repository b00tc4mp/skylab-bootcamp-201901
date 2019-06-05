import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logic from '../../logic'
import QRious from 'qrious'
import { Modal } from '../../components/Modal'

export function MyBasket () {
  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState(null)
  const [deletedOrderId, setDeletedOrderId] = useState(false)

  useEffect(function () {
    async function getOrders () {
      const results = await logic.retrieveUserOrders()
      setOrders(results)
    }
    getOrders()
  }, [deletedOrderId])

  const handleCloseModal = () => {
    setOrderId(null)
  }

  const deleteOrder = async (orderId) => {
    await logic.removeOneOrderBy(orderId)
    setDeletedOrderId(orderId)
  }

  const renderQR = () => {
    const { host, protocol } = window.location

    const qr = new QRious({
      size: 300,
      value: `${protocol}//${host}/orders/${orderId}`
    })

    return <img alt='QR Code' src={qr.toDataURL()} />
  }

  const renderResultsRender = () => (
    <div>
      {
        orders.map(function (order) {
          return (

            <div className='card' key={order.id}>
              <header className='card-header'>
                <p className='card-header-title'> Your Order:
                </p>
                <a href='#' className='card-header-icon' aria-label='more options'>
                  <span className='icon'>
                    <i className='fas fa-angle-down' aria-hidden='true' />
                  </span>
                </a>
              </header>
              <h2>Flavors: {order.flavors.join(', ')}</h2>
              <h2>Price: {order.totalPrice} $</h2>
              <small>{order.size}</small>
              <h3>Status: {order.status}</h3>

              <footer className='card-footer'>
                {/* <Link className='card-footer-item' to={`/orders/${order.id}`}>Go to order</Link> */}
                <a
                  className='card-footer-item'
                  onClick={() => setOrderId(order.id)}>
                  Show QR Code
                </a>
                <a href='#' className='card-footer-item' onClick={(e) => {
                  e.preventDefault()
                  deleteOrder(order.id)
                }}>Delete</a>
              </footer>

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
