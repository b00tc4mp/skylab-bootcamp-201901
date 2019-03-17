import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'
import './index.sass'
import Product from '../Product';

class ProductDetails extends Component {

    state = { product: [], feedback: null, fav: false, userProduct: false, sold: null, username: null, imageUrl: null, userId:null }

    componentDidMount() {

        const { props: { productId } } = this

        this.handleShowProduct(productId)
        this.checkMyProducts()
        this.checkProductFav()
        this.handleRetrieveUserFromProduct(productId)
    }

    checkMyProducts = () => {
        try {
            if (logic.isUserLoggedIn) {
                return logic.retrieveUserProducts()
                    .then(userProducts => {
                        const index = userProducts.findIndex(({ id }) => id == this.props.productId)
                        if (index >= 0) this.setState({ userProduct: true })
                    })
            }
        } catch (error) {

        }
    }

    checkProductFav = id => {
        try {
            if (logic.isUserLoggedIn) {
                logic.retrieveFavs()
                    .then(prodcutsOnFav => {
                        const index = prodcutsOnFav.findIndex(({ id }) => id == this.props.productId)
                        if (index >= 0) this.setState({ fav: true })
                    })
            }
        } catch (error) {

        }
    }

    componentWillReceiveProps(props) {
        this.handleShowProduct(props.productId)
    }

    handleShowProduct = id => {
        id = this.props.productId

        try {
            logic.retrieveProduct(id)
                .then(product => this.setState({ product }))
                .catch(({ message }) => this.setState({ feedback: message }))
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    onFav = id => {

        if (logic.isUserLoggedIn) {
            try {
                return logic.toogleFav(id)
                    .then(fav => this.setState({ fav }))
            } catch (error) {

            }
        } else {
            this.props.history.push('/login')
        }
    }

    handleOnSell = id => {
        try {
            logic.toogleSold(id)
                .then(() => this.handleShowProduct(id))
        } catch (error) {

        }
    }

    handleRetrieveUserFromProduct = productId => {
        try {
            logic.retrieveUserFromProducts(productId)
                .then(user => {
                    this.setState({ username: user[0].name })
                    this.setState({ imageUrl: user[0].imageUrl })
                    this.setState({userId: user[0].id})
                })
        } catch (error) {

        }
    }

    handleAnotherUser = id => {
        const { props: { anotherUser } } = this

        anotherUser(id)
    }

    render() {

        const { state: { product, feedback, fav, username } } = this

        return <section className="productDetails">
            <div className="productDetails__header">
                <div className="productDetails__html">
                    <div className="productDetails__icons">
                        <Link to="/">
                            <i className="fas fa-long-arrow-alt-left productDetails__icons--back"></i>
                        </Link>
                        {!this.state.userProduct && <i className={fav ? "fas fa-heart productDetails__icons--heart" : "far fa-heart productDetails__icons--heart"} onClick={() => this.onFav(product.id)}></i>}
                    </div>
                    <div className="productDetails__content">
                        <div className="productDetails__imgcontainer">
                            {product.sold && <img src="images/sold.png" className="productDetails__icons--sold"></img>}
                            <img className="productDetails__img" src={product.imageUrl} />
                        </div>
                        <div className="productDetails__details">
                            <p className="productDetails__price">{product.price} €</p>
                            <p className="productDetails__tittle">{product.tittle}</p>
                            <p className="productDetails__description">{product.description}</p>
                        </div>
                        <Link to="/ar/camera" className="productDetails__icons">
                            <i className="fas fa-vr-cardboard productDetails__icons--ar"></i>
                        </Link>
                        {!this.state.userProduct && <div className="productDetails__user" onClick={event => [this.handleAnotherUser(this.state.userId), event.stopPropagation()]}>
                            <img className="productDetails__user--img" src={this.state.imageUrl ? this.state.imageUrl : "/images/logoplaceholder.png" }></img>
                            <p className="productDetails__user--name">{username}</p>
                        </div>}
                    </div>
                    {this.state.userProduct && <button className="productDetails__btn" onClick={() => this.handleOnSell(product.id)}>{product.sold ? "In Stock" : "Check as Sold"}</button>}
                    {!this.state.userProduct && <button className="productDetails__btn">Chat</button>}
                </div>
            </div>
            <Feedback message={feedback} />
        </section>
    }
}

export default withRouter(ProductDetails)