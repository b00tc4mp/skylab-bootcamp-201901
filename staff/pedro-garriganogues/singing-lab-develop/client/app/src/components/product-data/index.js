import React, { Component } from 'react'
import logic from '../../logic'
import Footer from '../footer'
import './index.css'

class ProductData extends Component {

    constructor() {
        super()
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        logic.retrieveProduct(this.props.productId)
            .then(product => this.setState({ product }))
    }

    addToCart = () => {
        this.props.onAddToCart(this.props.productId)
    }

    render() {
        return (
            <main>
                <h2 className="main-title">Product details</h2>
                <section className="productData">
                    <div className="productDataSub">
                        <div className="col-sm-6 col-md-4 products">
                            <img src={this.state.product.image} id={`img-${this.state.product._id}`} className="product-data-image" alt="bruno mars" />
                        </div>
                        <div className="caption product-desc">
                            <h3>{this.state.product.name}</h3>
                            <h3>{this.state.product.price} €</h3>
                            <p>{this.state.product.description}</p>
                            <a className="btn btn-outline-secondary" onClick={this.addToCart} role="button">Add to the cart</a>
                        </div>
                    </div>
                </section>
                <div className="jumbotron">
                    <h1 className="display-4">Chat with our teachers!</h1>
                    <p className="lead">Use the firebase chat example from the Firebase workshop</p>
                    <hr className="my-4" />
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a className="btn btn-outline-secondary" role="button">Chat now</a>
                </div>
                <Footer />
            </main>
        )
    }

}

export default ProductData