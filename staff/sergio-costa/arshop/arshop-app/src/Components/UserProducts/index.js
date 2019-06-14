import React, { Component } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import Product from '../Product'
import './index.sass'

class UserProducts extends Component {

    render() {

        const { props: { feedback, products, favIds } } = this

        return <section className="user__products">
            {feedback && <Feedback message={feedback} />}
                {products && products.map(({ id, tittle, description, price, imageUrl, sold }) => {
                    return <Product key={id} id={id} tittle={tittle} description={description} price={price} imageUrl={imageUrl} sold={sold} idFav={favIds} onProductSelect={this.props.onProductSelect} />
                })}
        </section>
    }
}
export default UserProducts