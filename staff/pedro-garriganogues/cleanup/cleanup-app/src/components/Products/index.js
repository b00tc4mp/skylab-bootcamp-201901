
import React, { Component } from 'react'
import logic from '../../logic'

import './index.css'
import Indexitems from './../Indexitems'

class Products extends Component {

    constructor() {
        super()
        this.state = {
            products: [],
            categoryName: ''
        }
    }

    // componentDidMount() {
    //     logic.listProducts(this.props.categoryId)
    //         .then(products => {
    //             this.setState({ products })
    //         })

    //     logic.listCategories()
    //         .then(categories => {
    //             const category = categories.filter(category => category._id === this.props.categoryId)

    //             this.setState({ categoryName: category[0].name })
    //         })
    // }

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
                <Indexitems
                    productDetail
                    items={this.state.products}
                />
            </main>
        )
    }

}

export default Products