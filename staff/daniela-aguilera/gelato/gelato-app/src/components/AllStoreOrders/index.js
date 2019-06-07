import React, { useEffect, useState } from 'react'
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
                <button className='card-footer-item' onClick={(e) => {
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
