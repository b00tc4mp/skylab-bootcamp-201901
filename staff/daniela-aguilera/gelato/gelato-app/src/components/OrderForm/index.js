import React, { Fragment, useEffect, useState, useRef } from 'react'
import StripePayment from '../StripePayment'
import { Redirect } from 'react-router-dom'

import logic from '../../logic'

const FLAVORS = {
  0: { literal: 'Blackberry Rosé' },
  1: { literal: 'Chocolate Caramel' },
  2: { literal: 'Avocado with Lemon' },
  3: { literal: 'Exotic Mango' },
  4: { literal: 'Special Mint' },
  5: { literal: 'Watermelon' }
}

const SIZES = {
  'small': { multiplierPrice: 1 },
  'medium': { multiplierPrice: 2 },
  'big': { multiplierPrice: 3 }
}

const LIMIT_FLAVORS = {
  'small': 2, // small
  'medium': 3, // medium
  'big': 4 // big
}

const TYPES = {
  'cone': { price: 4 },
  'tub': { price: 3 }
}

export function OrderForm () {
  const orderScrollerElement = useRef()

  const [flavors, setFlavors] = useState([])
  const [type, setType] = useState(null)
  const [size, setSize] = useState(null)
  const [step, setStep] = useState(0)
  const [orderId, setOrderId] = useState(null)

  const handleTypeChange = e => {
    const { value } = e.target
    setType(value)
    setStep(1)
  }

  const handleSizeChange = e => {
    const { value } = e.target
    setSize(value)
    setStep(2)
  }

  const handleFlavorsChange = e => {
    const { checked, value } = e.target

    if (checked) {
      if (LIMIT_FLAVORS[size] <= flavors.length) {
        e.target.checked = false
        return
      }

      const newFlavors = flavors.concat(value)
      setFlavors(newFlavors)
    } else {
      const newFlavors = flavors.filter(flavor => flavor !== value)
      setFlavors(newFlavors)
    }
  }

  const calculatePrice = () => {
    if (type !== null && size !== null) {
      return SIZES[size].multiplierPrice * TYPES[type].price
    }
  }

  useEffect(function () {
    // tomamos el element que hemos guardado en la referencia
    const element = orderScrollerElement.current
    // comprobamos si tenemos un elemento
    if (element) {
      // tomamos el ancho del elemento
      const elementWidth = element.clientWidth
      // multiplicamos el ancho del elemento por el paso actual y lo hacemos negativo
      // ya que el movimiento es hacia la izquierda.
      const movement = (elementWidth * step * -1) + 'px'
      // usamos translate3d porque usa la aceleración del hardware
      element.style = `transform: translate3d(${movement}, 0, 0)`
    }
  }, [step]) // este efecto lo ejecutamos sólo cuando cambia el valor de step

  const renderTypeInputs = () => (
    <section className='g-Order-step'>
      <h2 className='subtitle is-3'>Select your type!</h2>
      {
        Object.keys(TYPES).map(typeId => {
          const { price } = TYPES[typeId]
          const id = `TYPE-${typeId}`
          return (
            <Fragment key={id}>
              <input type='radio'
                id={id}
                name='type'
                value={typeId}
                onChange={handleTypeChange}
              />
              <label className='g-Order-stepLabel g-Order-stepLabel--type' htmlFor={id}>
                <img alt={typeId} src={`/images/${typeId}.jpg`} />
                <div>
                  <h2>{typeId}</h2>
                  <h3>{price} $</h3>
                </div>
              </label>
            </Fragment>
          )
        })
      }
    </section>
  )

  const renderSizeInput = () => (
    <section className='g-Order-step'>
      <h2 className='subtitle is-3'>Select your size!</h2>
      {
        Object.keys(SIZES).map(sizeId => {
          const { multiplierPrice } = SIZES[sizeId]
          const id = `SIZE-${sizeId}`
          return (
            <Fragment key={id}>
              <input type='radio'
                id={id}
                name='size'
                value={sizeId}
                onChange={handleSizeChange}
              />
              <label className='g-Order-stepLabel g-Order-stepLabel--size' htmlFor={id}>
                <img alt={`${type} ${sizeId}`} src={`/images/${type}_${sizeId}.jpg`} />
                <div>
                  <h2>{sizeId}</h2>
                  {type !== null && <h3>{multiplierPrice * TYPES[type].price} $</h3>}
                </div>
              </label>
            </Fragment>
          )
        })
      }

      <button className='button is-light' onClick={(e) => {
        e.preventDefault()
        setStep(0)
      }}>
        <span className='icon is-small'>
          <i className='fas fa-chevron-left' />
        </span>
        <span>Previous</span>
      </button>
    </section>
  )

  const renderFlavorsInput = () => (
    <section className='g-Order-step'>
      <h2 className='subtitle is-3'>Select your flavors!</h2>
      <small>You could selector {LIMIT_FLAVORS[size]} flavors</small>
      <div className='g-Order-stepGrid'>
        {
          Object.keys(FLAVORS).map(flavorId => {
            const { literal } = FLAVORS[flavorId]
            const id = `flavor-${flavorId}`
            return (
              <Fragment key={id}>
                <input
                  type='checkbox'
                  id={id}
                  name={id}
                  value={literal}
                  onChange={handleFlavorsChange} />
                <label className='g-Order-stepLabel g-Order-stepLabel--flavor' htmlFor={id}>
                  <img alt={id} src={`/images/${id}.jpg`} />
                  <h2>{literal}</h2>
                </label>
              </Fragment>
            )
          })
        }
      </div>
      <div className='g-Order-stepButtons'>
        <button className='button is-light' onClick={(e) => {
          e.preventDefault()
          setStep(1)
        }}>
          <span className='icon is-small'>
            <i className='fas fa-chevron-left' />
          </span>
          <span>Previous</span>
        </button>
        <button className='button is-success'>
          <span className='icon is-small'>
            <i className='fas fa-check' />
          </span>
          <span>
        Confirm Order
          </span>
        </button>
      </div>
      <h2>Total price: {calculatePrice()} $</h2>
    </section>
  )

  async function _handleSubmit (event) {
    event.preventDefault()
    // const totalPrice = calculatePrice()
    // await logic.addOrder(flavors, size, type, totalPrice)
    setStep(3)
  }

  const handlePurchase = async (token) => {
    if (token) {
      setStep(4)
      const totalPrice = calculatePrice()
      await logic.addOrder(flavors, size, type, totalPrice)
    }
  }

  const renderPayment = () => (

    <section className='g-Order-step g-Order-step--payment'>
      <h2 className='subtitle is-3'>Your order is almost ready!</h2>
      <small>Please, click on the button to do the playment</small>

      <h2><strong><i className='fas fa-shopping-basket' />Total Price: </strong> {calculatePrice()} $</h2>
      <StripePayment onTokenSucces={handlePurchase} cart={calculatePrice()} flavors={flavors} />
    </section>
  )

  if (step === 4) {
    return (
      // <Redirect to='/my-basket' />
      <Redirect to='/store/map' />
    )
  }

  return (
    <div>
      <form className='g-Order' onSubmit={_handleSubmit}>
        <div className='g-Order-scroller' ref={orderScrollerElement}>
          {renderTypeInputs()}
          {renderSizeInput()}
          {renderFlavorsInput()}
          {renderPayment()}
        </div>
      </form>
    </div>
  )
}
