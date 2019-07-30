import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import logic from '../../logic'
import { Loading } from '../Loading'

export function AllStoreOrders () {
  const [storeOrders, setStoreOrders] = useState([])
  const [deletedOrderId, setDeletedOrderId] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function getOrders () {
      setLoading(true)
      const clientsOrders = await logic.retrieveAllUsersOrders()
      setLoading(false)
      setStoreOrders(clientsOrders)
    }

    getOrders()
  }, [deletedOrderId])

  async function handleDeleteSubmit (orderId) {
    await logic.removeOneOrderBy(orderId)
    setDeletedOrderId(orderId)
  }

  if (!logic.isUserAdmin) {
    return <Redirect to='/' />
  }

  if (loading) {
    return <Loading />
  }

  if (storeOrders.length === 0) {
    return <div className='notification is-warning'>
      You don't have orders to check!
    </div>
  }

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
              </header>
              <div className='card-content'>
                <div className='content-store-orders'>
                  <p className='subtitle is-6'><span className='order-store-span'>OrderId:</span> {order.id}</p>
                  <p className='subtitle is-6'><span className='order-store-span'>Type: </span>{order.type}</p>
                  <p className='subtitle is-6'><span className='order-store-span'>Size: </span> {order.size}</p>
                  <p className='subtitle is-6'><span className='order-store-span'>Flavors: </span> {order.flavors.join(', ')}</p>
                  <p className='subtitle is-6'><span className='order-store-span'>Price: </span> {order.totalPrice} $</p>
                  <p className='subtitle is-6'><span className='order-store-span'>Status: </span>{order.status}</p>
                </div>
              </div>
              <footer className='card-footer'>
                <button className='button is-danger is-fullwidth' onClick={(e) => {
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
}
