import React, { useState, useEffect } from 'react'
import TitleCategory from '../TitleCategory'
import TitleSubCategory from '../TitleSubCategory'
import MyProducts from './MyProducts'
import CloserX from '../CloserX'
import ProductPrice from './MyProducts/Myproduct/ProductPrice'
import './index.sass'

const cx = require('classnames');

function UserOrder({ user, handleAddCard, handleCloseCard, userCard, total, setTotal, handleAddOrder }) {
    debugger
    const { card } = user

    const className1 = cx({
        'g-Home__order-user-back g-Home__order-user-back--opened': userCard,
        'g-Home__order-user-back': !userCard
    })

    useEffect(() => {
        let acc = 0
        const { card } = user
        card.map(elem => {
            acc += Number(elem.price)
        })
        setTotal(acc)
    }, [])
    
    return (
        <section className={className1}>
            <div className='g-Home__order-user'>
                <CloserX close={handleCloseCard} />
                <TitleCategory title={'Your order'} />
                <TitleSubCategory subTitle={'Drinks'} />
                <MyProducts card={card} categoryOfProduct={'drink'} handleAddCard={handleAddCard} />
                <TitleSubCategory subTitle={'Food'} />
                <MyProducts card={card} categoryOfProduct={'Food'} handleAddCard={handleAddCard} />
                <TitleSubCategory subTitle={'bakery'} />
                <MyProducts card={card} categoryOfProduct={'Bakery'} handleAddCard={handleAddCard} />
                <div className='g-Home__order-user-total'>
                    <ProductPrice  price={`TOTAL: ${total}`}/>
                </div>
                <button onClick={handleAddOrder}>Order</button>
            </div>
        </section>
    )
}

export default UserOrder