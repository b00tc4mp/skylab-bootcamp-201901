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

        logic.retrieveProduct(this.props.productId)
            .then(product => this.setState({ product }))
    }



    render() {
        return (
            <main>

                <section className="section3">
                    <div>
                        <div>
                            <img className="productImage" src={this.state.product.image} id={`img-${this.state.product._id}`} alt="404" />
                        </div>
                        <div >
                            <h2 className="productName">{this.state.product.name}</h2>
                            <h3 className="productPrice">{this.state.product.price} €</h3>
                            <button>Add to the cart</button>
                            <p className="productDescription">{this.state.product.description}</p>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

}

export default Product