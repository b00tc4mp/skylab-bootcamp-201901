import React, { Fragment, useState, useEffect } from 'react'

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
    // host -> "localhost:3000"
    // protocol -> "http"
    const { host, protocol } = window.location

    const qr = new QRious({
      size: 300, // size of the image
      value: `${protocol}//${host}/orders/${orderId}` // string to transform to qr
    })

    return <img alt='QR Code' src={qr.toDataURL()} />
  }

  const renderNoResults = () => (
    <div className='notification is-warning'>
      You don't have orders to check!
    </div>
  )

  const renderResultsRender = () => (
    <Fragment>
      {
        orders.map(function (order) {
          return (
            <div className='card' key={order.id}>
              <header className='card-header'>
                <p className='card-header-title'> Your Order:</p>
              </header>
              <h2>Flavors: {order.flavors.join(', ')}</h2>
              <h2>Price: {order.totalPrice} $</h2>
              <small>{order.size}</small>
              <h3>Status: {order.status}</h3>

              <footer className='card-footer'>
                {/* <Link className='card-footer-item' to={`/orders/${order.id}`}>Go to order</Link> */}
                <div className='card-footer-item'>
                  <button
                    className='button is-fullwidth'
                    onClick={() => setOrderId(order.id)}>
                    <span className='icon is-small'>
                      <i className='fas fa-qrcode' />
                    </span>
                    <span>Show QR Code</span>
                  </button>
                </div>
                <div className='card-footer-item'>
                  <button className='button is-danger is-fullwidth' onClick={(e) => {
                    e.preventDefault()
                    deleteOrder(order.id)
                  }}>Delete</button>
                </div>
              </footer>

            </div>
          )
        })
      }
      {
        orderId !== null && <Modal onClose={handleCloseModal}>
          <div className='g-Qr-Code'>
            {renderQR()}
          </div>
        </Modal>
      }
    </Fragment>
  )

  return (
    <section className='g-Layout'>
      {orders.length === 0 && renderNoResults()}
      {orders.length > 0 && renderResultsRender()}
    </section>
  )
}
