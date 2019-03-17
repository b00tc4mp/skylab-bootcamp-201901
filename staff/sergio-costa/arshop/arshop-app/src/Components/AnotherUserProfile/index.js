import React, { Component } from 'react'
import { Link, withRouter, Route } from 'react-router-dom'
import logic from '../../logic'
import Product from '../Product'
import './index.sass'

class AnotherUserProfile extends Component {

    state = { products: [], feedback: null, favIds: [], username: null, image: null, userImage: null, userid: null }

    componentDidMount() {

        const { props: { userid } } = this

        this.handleRetrieveUserIdProducts(userid)
        this.retrieveUserIdName(userid)

    }

    retrieveUserIdName = userid => {
            logic.retrieveUserWithId(userid)
                .then(user => {
                    this.setState({ username: user.name })
                    if (user.imageUrl !== null) {
                        this.setState({ userImage: user.imageUrl })
                    }
                })
    }

    handleRetrieveUserIdProducts = userid => {
        try {
            logic.retrieveProductsFromUserId(userid)
                .then(products => {
                    this.setState({ products })
                })
                .then(() => logic.retrieveFavs())
                .then(favIds => this.setState({ favIds }))
                .catch(({ message }) => {
                    this.setState({ feedback: message })
                })
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {
        return <section className="another">
            <div className="another__header">
                <div className="another__icons">
                    <Link to="/">
                        <i className="fas fa-long-arrow-alt-left another__icons--back"></i>
                    </Link>
                </div>
                <div className="another__user">
                    <h3 className="another__user--text">{this.state.username}</h3>
                    <div className="another__file">
                        <div className="personal-image">
                            <img src={this.state.userImage ? this.state.userImage : "/images/logoplaceholder.png"} className="personal-avatar" alt="avatar" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="another__nav">
                <div className="another__link">
                    <p className="another__link--number">{this.state.products.length}</p>
                    <p className="another__link--text">Products</p>
                </div>
            </div>
            <div className="products">
                {this.state.products.map(({ id, tittle, description, price, imageUrl, sold }) => {
                    return <Product key={id} id={id} tittle={tittle} description={description} price={price} imageUrl={imageUrl} sold={sold} idFav={this.state.favIds} onProductSelect={this.props.onProductSelect} />
                })}
            </div>
        </section>
    }
}

export default withRouter(AnotherUserProfile)