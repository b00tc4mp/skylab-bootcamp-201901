import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import logic from '../../logic'

export function AllStoreOrders () {
  const [storeOrders, setStoreOrders] = useState([])
  const [deletedOrderId, setDeletedOrderId] = useState(false)

  useEffect(function () {
    async function getOrders () {
      const clientsOrders = await logic.retrieveAllUsersOrders()
      setStoreOrders(clientsOrders)
    }

    getOrders()
  }, [deletedOrderId])

  async function handleDeleteSubmit (orderId) {
    await logic.removeOneOrderBy(orderId)
    setDeletedOrderId(orderId)
  }

  if (logic.isUserLoggedIn && logic.isUserAdmin) {
    return (
      <div>
        {
          storeOrders.map(function (order) {
            return (
              <div className='card' key={order.id}>
                <header className='card-header'>
                  <p className='card-header-title'>
      Client order:
                  </p>
                  <a href='#' className='card-header-icon' aria-label='more options'>
                    <span className='icon'>
                      <i className='fas fa-angle-down' aria-hidden='true' />
                    </span>
                  </a>
                </header>
                <div className='card-content'>
                  <div className='content'>
                    <p className='subtitle is-6'>OrderId: {order.id}</p>
                    <p className='subtitle is-6'>Type: {order.type}</p>
                    <p className='subtitle is-6'>Size: {order.size}</p>
                    <p className='subtitle is-6'>Flavors: {order.flavors.join(', ')}</p>
                    <p className='subtitle is-6'>Price: {order.totalPrice} $</p>
                    <p className='subtitle is-6'>Status: {order.status}</p>
                  </div>
                </div>
                <footer className='card-footer'>
                  <a href='#' className='card-footer-item'>Update</a>
                  <button href='#' className='card-footer-item' onClick={(e) => {
                    e.preventDefault()
                    handleDeleteSubmit(order.id)
                  }}>Delete</button>
                </footer>
              </div>
            )
          })
        }
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}
