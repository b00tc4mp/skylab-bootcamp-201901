import React, { Component } from 'react'
import logic from '../../logic'

import './index.css'
import Indexitems from './../Indexitems'

class Totalproducts extends Component {

    constructor() {
        super()
        this.state = {
            products: []
        }
    }

    componentDidMount() {

        logic.listTheProducts()
            .then(products => this.setState({ products }))
    }

    render() {

        return (
            <main className="main">
                <h2>The products</h2>

                <Indexitems className="products"
                    productDetail
                    items={this.state.products}
                />

            </main>
        )
    }

}

export default Totalproducts