import React, { Component } from 'react'
import logic from '../../logic'

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



    render() {
        return (
            <main>
                <h2>Lorem</h2>
                <section>
                    <div>
                        <div>
                            <img src={this.state.product.image} id={`img-${this.state.product._id}`} alt="404" />
                        </div>
                        <div >
                            <h3>{this.state.product.name}</h3>
                            <h3>{this.state.product.price} €</h3>
                            <p>{this.state.product.description}</p>
                        </div>
                    </div>
                </section>
                <div >
                    <p>Lorem</p>
                </div>

            </main>
        )
    }

}

export default ProductData