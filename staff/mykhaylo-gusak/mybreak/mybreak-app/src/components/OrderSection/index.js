import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import logic from '../../logic/index.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck, faLock } from '@fortawesome/free-solid-svg-icons';

import '../../../node_modules/bulma/bulma.sass'
import './index.sass'

import ProductSection from './ProductSection'
import Landing from '../../pages/Landing'

const cx = require('classnames')



function OrderSection({ }) {

    const [products, setProducts] = useState(false);
    const [showError, setErrorMessage] = useState(false);

    const icons = cx({



    })

    async function handleProductsByCategory(category) {

        return (async () => {
            try {
                const _products = await logic.retrieveProducts('drink')
                setProducts(_products)
            } catch (err) {
                setErrorMessage(err.message)
            }
        })()

    }


    return (<>
        <Landing handleProductsByCategory={handleProductsByCategory} />
        <section className='g-OrderSection'>
            <ProductSection products={products} showError={showError} />
        </section>


    </>);
}

export default OrderSection