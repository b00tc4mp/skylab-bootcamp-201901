import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'

class UserProducts extends Component {

    state = { products: [], feedback: null }

    componentDidMount() {
        try {
            logic.retrieveUserProducts()
                .then(products => {
                    this.setState({ products })
                })
                .catch(({ message }) => {
                    this.setState({ feedback: message })
                })
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {

        const { state: { feedback, products }, onProductSelect, onFav } = this

        return <section>
            <header className="header">
                <Link className="header__btn" to="/">
                <i class="fas fa-long-arrow-alt-left"></i>
                </Link>
            </header>
            {feedback && <Feedback message={feedback} />}
            <div className="products">
                {products.map(({ id, tittle, description, price, imageUrl, sold }) => {
                    return <div className="product" key={id} onClick={() => onProductSelect(id)}>
                        <div className="product__imgcontainer">
                            <img className="product__img" src={imageUrl} />
                        </div>
                        <div className="product__content">
                            <p className="product__price">{price} €</p>
                            <p className="product__tittle">{tittle}</p>
                            <p className="product__description">{description}</p>
                        </div>
                        <div className="product__btncontainer" onClick={() => onFav(id)}>
                            <button className="product__btn">
                                <i className="far fa-heart product__logo"></i>
                            </button>
                        </div>
                    </div>
                })}
            </div>
        </section>
    }
}
export default UserProducts