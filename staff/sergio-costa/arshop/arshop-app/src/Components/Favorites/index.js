import React, { Component } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import Product from '../Product'

class Favorites extends Component {


    render() {
        const { props: { feedback, products } } = this

        return <section>
            {feedback && <Feedback message={feedback} />}
            <div className="products">
                {products.map(({ id, tittle, description, price, imageUrl, sold }) => {
                    return <Product key={id} id={id} tittle={tittle} description={description} price={price} imageUrl={imageUrl} sold={sold} idFav={products} />
                })}
            </div>
        </section>
    }
}
export default Favorites