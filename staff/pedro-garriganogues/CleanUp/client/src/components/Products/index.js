// import React, { Component } from 'react'
// import './index.css'


// class Products extends Component {



//     render() {
//         return (
//             <main>

//                 <h1>Products</h1>


//             </main>
//         )
//     }

// }

// export default Products

import React, { Component } from 'react'
import logic from '../../logic'

import './index.css'
import ListItems from './../Listitems'

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

            <main>
                {this.state.categoryName && <h2 className="main-title category-titles">{this.state.categoryName}</h2>}
                <ListItems
                    productDetail
                    cartProducts
                    items={this.state.products}
                    onAddToCart={this.props.onAddToCart}
                />

            </main>
        )
    }

}

export default Products