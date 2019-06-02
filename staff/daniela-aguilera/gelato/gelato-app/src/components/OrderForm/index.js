import React, { Fragment, useEffect, useState, useRef } from 'react'
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
    const element = orderScrollerElement.current
    const elementWidth = element.clientWidth
    const movement = (elementWidth * step * -1) + 'px'
    element.style = `transform: translate3d(${movement}, 0, 0)`
  }, [step])

  const renderTypeInputs = () => (
    <section className='g-OrderStep'>
      <h2 className='subtitle'>Select your type!</h2>
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
              <label htmlFor={id}>
                {typeId}
                <h3>{price} $</h3>
              </label>
            </Fragment>
          )
        })
      }
    </section>
  )

  const renderSizeInput = () => (
    <section className='g-OrderStep'>
      <h2 className='subtitle'>Select your size!</h2>
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
              <label htmlFor={id}>
                {sizeId}
                {type !== null && <h3>{multiplierPrice * TYPES[type].price} $</h3>}
              </label>
            </Fragment>
          )
        })
      }

      <button onClick={(e) => {
        e.preventDefault()
        setStep(0)
      }}>Previous</button>
    </section>
  )

  const renderFlavorsInput = () => (
    <section className='g-OrderStep'>
      <h2 className='subtitle'>Select your flavors!</h2>
      <small>You could selector {LIMIT_FLAVORS[size]} flavors</small>
      {
        Object.keys(FLAVORS).map(flavorId => {
          const { literal } = FLAVORS[flavorId]
          const id = `flavor-${flavorId}`

          return (
            <div key={id}>
              <input
                type='checkbox'
                id={id}
                name={id}
                value={literal}
                onChange={handleFlavorsChange} />
              <label htmlFor={id}>{literal}</label>
            </div>
          )
        })
      }
      <button onClick={(e) => {
        e.preventDefault()
        setStep(1)
      }}>Previous</button>
      <button>Confirm Order</button>
      <h2>Total price: {calculatePrice()} $</h2>
    </section>
  )

  async function _handleSubmit (event) {
    event.preventDefault()
    const totalPrice = calculatePrice()
    await logic.addOrder(flavors, size, type, totalPrice)
    setStep(3)
  }

  const renderPayment = () => (
    <section className='g-OrderStep'>
      <h2 className='subtitle'>Ñam! Ñam! Your order is almost ready!</h2>
      <h2>Payment: </h2>
      <h3> Total price: {calculatePrice()} $</h3>
      <button>I want my icecream</button>
    </section>
  )

  return (
    <form className='g-Order' onSubmit={_handleSubmit}>
      <div className='g-OrderScroller' ref={orderScrollerElement}>
        {renderTypeInputs()}
        {renderSizeInput()}
        {renderFlavorsInput()}
        {renderPayment()}
      </div>
    </form>
  )
}
