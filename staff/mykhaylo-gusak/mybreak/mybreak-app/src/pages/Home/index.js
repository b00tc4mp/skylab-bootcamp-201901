import React, { useState, useEffect } from 'react';

import './index.sass'

import OrderSection from '../../components/OrderSection'
import UserOrder from '../../components/UserOrder'
import Start from '../../components/Start'
import Loader from '../../components/Loader'
import UserMenu from '../../components/UserMenu'
import { CSSTransition } from 'react-transition-group'

import logic from '../../logic'

function Home({ user, handleAddCard, logOut, userMenu, userCard, handleCloseMenu, handleCloseCard, total, setTotal, handleAddOrder }) {
    debugger
    const [products, setProducts] = useState(false);
    const [showError, setErrorMessage] = useState(false);
    const [ticket, setTicket] = useState(false);

    const handleProductsByCategory = async () => {

        try {
            const _products = await logic.retrieveProducts(' ')
            setProducts(_products)
        } catch (err) {
            setErrorMessage(err.message)
        }
    }


    return (
        <>
            {user && <UserMenu logOut={logOut} handleCloseMenu={handleCloseMenu} userMenu={userMenu} user={user} />}

            {user && < UserOrder user={user} handleAddCard={handleAddCard} handleCloseCard={handleCloseCard} total={total} setTotal={setTotal} handleAddOrder={handleAddOrder} />}

            {!products && <Start className='g-Home__start' handleProductsByCategory={handleProductsByCategory} />}

            <CSSTransition
                in={products}
                timeout={600}
                classNames='orderSection'
            >
                <section className='g-Home__order'>

                    {products && <OrderSection card={user.card} products={products} showError={showError} handleAddCard={handleAddCard} />}
                </section>
            </CSSTransition >


        </>
    );
}

export default Home
