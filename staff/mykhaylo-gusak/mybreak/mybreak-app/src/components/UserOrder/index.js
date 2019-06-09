import React, { useState, useEffect } from 'react'
import TitleCategory from '../TitleCategory'
import TitleSubCategory from '../TitleSubCategory'
import MyProducts from './MyProducts'
import CloserX from '../CloserX'
import ProductPrice from './MyProducts/Myproduct/ProductPrice'
import './index.sass'

const cx = require('classnames');

function UserOrder({ user,handleUpdateMyOrders, handleAddCard, handleCloseCard, userCard, handleAddOrder, orders }) {
    const { card } = user

    const className1 = cx({
        'g-Home__order-back g-Home__order-back--opened': userCard,
        'g-Home__order-back': !userCard
    })

    const [total, setTotal] = useState(0)
    const [myCard, setCard] = useState(0)

    useEffect(() => {
        let acc = 0
        card.map(elem => {
            acc += Number(elem.price)
        })
        setTotal(acc)
        setCard(card)
    }, [card, orders])

    return (
        <section className={className1}>
            <div className='g-Home__order-user'>
                <div className='g-Home__order-user-close' >
                    <CloserX close={handleCloseCard} />
                </div>
                <TitleCategory title={'Your order'} />
                <TitleSubCategory subTitle={'Drinks'} />
                <MyProducts card={myCard} categoryOfProduct={'drink'} handleAddCard={handleAddCard} />
                <TitleSubCategory subTitle={'Food'} />
                <MyProducts card={myCard} categoryOfProduct={'Food'} handleAddCard={handleAddCard} />
                <TitleSubCategory subTitle={'bakery'} />
                <MyProducts card={myCard} categoryOfProduct={'Bakery'} handleAddCard={handleAddCard} />
                <div className='g-Home__order-user-total'>
                    <ProductPrice price={`TOTAL: ${total}`} />
                </div>
                <button onClick={handleAddOrder}>Order</button>
            </div>
        </section>
    )
}

export default UserOrder