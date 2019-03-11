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

                <section>
                    <div>
                        <div>
                            <img src={this.state.product.image} id={`img-${this.state.product._id}`} alt="404" />
                        </div>
                        <div >
                            <h2>{this.state.product.name}</h2>
                            <h3>{this.state.product.price} €</h3>
                            <p>{this.state.product.description}</p>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

}

export default Product