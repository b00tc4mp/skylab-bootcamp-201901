import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logic from '../../logic'
import './index.sass'

class ProductDetails extends Component {

    state = { product: [] }

    componentDidMount(){

        const{ props: { productId } } = this

        try {
            logic.retrieveProduct(productId)
                .then(product => this.setState({product}))
        } catch (error) {
            
        }
    }


    render() {
        return <section className="productDetails">
            <div className="productDetails__header">
                <div className="productDetails__icons">
                    <Link to="/">
                        <i className="fas fa-long-arrow-alt-left productDetails__icons--back"></i>
                    </Link>
                    <Link to="/">
                        <i className="far fa-heart productDetails__icons--heart"></i>
                    </Link>
                </div>
                <div className="productDetails__content">
                    <div className="productDetails__imgcontainer">
                        <img className="productDetails__img" src="/images/logoplaceholder.png"></img>
                    </div>
                    <div className="productDetails__details">
                        <p className="productDetails__price">2000 €</p>
                        <p className="productDetails__tittle">Seat Ibiza</p>
                        <p className="productDetails__description">Description aasdasd asd asd asd asdasasdadas dasasd asd</p>
                    </div>
                </div>
                <button className="productDetails__btn">Chat</button>
            </div>
        </section>
    }
}

export default withRouter(ProductDetails)