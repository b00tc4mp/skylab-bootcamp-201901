import React, { Component } from 'react'
import logic from '../../logic'
import Footer from '../footer'
import './index.css'
import ListItems from './../list-items'

class Products extends Component {

    constructor() {
        super()
        this.state = {
            products: [],
            categoryName: ''
        }
    }

    componentDidMount() {
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

            <main>
                {this.state.categoryName && <h2 className="main-title category-titles">{this.state.categoryName}</h2>}
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

export default Products