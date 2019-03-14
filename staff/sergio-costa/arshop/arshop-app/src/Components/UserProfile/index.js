import React, { Component } from 'react'
import { Link, withRouter, Route } from 'react-router-dom'
import logic from '../../logic'
import UserProducts from '../UserProducts'
import Favorites from '../Favorites'
import './index.sass'

class UserProfile extends Component {

    state = { products: [], feedback: null, favIds: [] }

    componentDidMount() {
        try {
            logic.retrieveUserProducts()
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
        return <section className="profile">
            <div className="profile__header">
                <div className="profile__icons">
                    <Link to="/">
                        <i className="fas fa-long-arrow-alt-left profile__icons--back"></i>
                    </Link>
                </div>
                <div className="profile__user">
                    <h3 className="profile__user--text">USERNAME</h3>
                    <img className="profile__user--img" src="/images/logoplaceholder.png"></img>
                </div>
            </div>
            <div className="profile__nav">
                <Link className={this.props.location.pathname.includes('/user/profile/products') ? "profile__link bordergreen" : "profile__link"} to="/user/profile/products">
                    <p className="profile__link--number">{this.state.products.length}</p>
                    <p className="profile__link--text">Products</p>
                </Link>
                <Link className={this.props.location.pathname.includes('/user/profile/favorites') ? "profile__link bordergreen" : "profile__link"} to="/user/profile/favorites">
                    <p className="profile__link--number">{this.state.favIds.length}</p>
                    <p className="profile__link--text">Favorites</p>
                </Link>
            </div>
            <Route path="/user/profile/products" render={() => <UserProducts products={this.state.products} favIds={this.state.favIds} feedback={this.state.feedback} onProductSelect={this.props.onProductSelect}/>} />
            <Route path="/user/profile/favorites" render={() => <Favorites products={this.state.favIds} feedback={this.state.feedback} onProductSelect={this.props.onProductSelect}/>} />
        </section>
    }
}

export default withRouter(UserProfile)