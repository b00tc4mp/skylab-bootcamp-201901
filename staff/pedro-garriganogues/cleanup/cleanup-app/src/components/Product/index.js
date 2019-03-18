import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'


class Product extends Component {

    constructor() {
        super()
        this.state = {
            product: []
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        logic.getProduct(this.props.productId)
            .then(product => this.setState({ product }))


        logic.listTheProducts()
            .then(products => {
                this.setState({ products })
            })
    }






    render() {
        return (
            <section>

                <section className="section3">
                    <div>
                        <div>
                            <img className="productImage" src={this.state.product.image} id={`img-${this.state.product._id}`} alt="404" />
                        </div>
                        <h2 className="productName">{this.state.product.name}</h2>
                        <div >
                            <p className="productDescription">{this.state.product.description}</p>
                            <div className="productCard">
                                <h3 className="productPrice">{this.state.product.price} €</h3>
                                <button className="addcartbutton" onClick={() => logic.addProductToCart(this.state.product)}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        )
    }

}

export default Product