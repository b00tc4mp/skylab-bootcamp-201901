
import React, { Component } from 'react'
import logic from '../../logic'

import './index.css'
import IndexProducts from './../IndexProducts'

class Products extends Component {

    constructor() {
        super()
        this.state = {
            products: [],
            categoryName: ''
        }
    }


    componentDidUpdate(prevProps) {
        if (prevProps.categoryId !== this.props.categoryId) {
            logic.listProducts(this.props.categoryId)
                .then(products => {
                    this.setState({ products })
                })

            logic.listCategories()
                .then(categories => {
                    const category = categories.filter(category => category._id === this.props.categoryId)

                    this.setState({ categoryName: category[0].name })
                })

        }
    }

    render() {
        return (

            <main className="products">
                {this.state.categoryName && <h2>{this.state.categoryName}</h2>}
                <IndexProducts
                    productDetail
                    items={this.state.products}
                />
            </main>
        )
    }

}

export default Products