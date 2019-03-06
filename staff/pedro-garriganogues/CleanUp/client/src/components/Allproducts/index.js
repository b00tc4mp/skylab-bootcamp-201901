import React, { Component } from 'react'
import logic from '../../logic'

import './index.css'
import ListItems from './../Listitems'

class AllProducts extends Component {

    constructor() {
        super()
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        logic.listAllProducts()
            .then(products => this.setState({ products }))
    }

    render() {

        return (
            <main>
                <h2>All products</h2>
                <hr />

                <ListItems
                    productDetail
                    items={this.state.products}
                />

            </main>
        )
    }

}

export default AllProducts