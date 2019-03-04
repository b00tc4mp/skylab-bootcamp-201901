import React, { Component } from 'react'
import logic from '../../logic'
import Footer from '../footer'
import './index.css'
import ListItems from './../list-items'

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
                <h2 className="main-title category-titles">All products</h2>
                <hr />

                <ListItems
                    productDetail
                    cartProducts
                    items={this.state.products}
                    onAddToCart={this.props.onAddToCart}
                />
                <Footer />
            </main>
        )
    }

}

export default AllProducts