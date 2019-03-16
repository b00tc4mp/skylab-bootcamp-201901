import React, { Component } from 'react'
import { Link, withRouter, Route } from 'react-router-dom'
import logic from '../../logic'
import UserProducts from '../UserProducts'
import Favorites from '../Favorites'
import './index.sass'

class UserProfile extends Component {

    state = { products: [], feedback: null, favIds: [], username: null, image: null, userImage: null }

    componentDidMount() {

        this.handleRetrieveProducts()
        this.retrieveUserName()

    }

    retrieveUserName = () => {
        if (logic.isUserLoggedIn) {
            logic.retrieveUser()
                .then(user => {
                    this.setState({ username: user.name })
                    if(user.imageUrl !== null){
                        this.setState({userImage: user.imageUrl})
                    }
                })
        }
    }

    handleRetrieveProducts = () => {
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

    handleUserImage = () => {
        try {
            const { state: {image} } = this
            logic.uploadUserImg({image})
                .then(user => this.setState({userImage: user.imageUrl}))
        } catch (error) {
            
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
                    <h3 className="profile__user--text">{this.state.username}</h3>
                    <div className="profile__file">
                        <div class="personal-image">
                            <label class="label">
                                <input type="file" onChange={e => this.setState({ image: e.target.files[0] }, () => this.handleUserImage())} />
                                <figure class="personal-figure">
                                    <img src={this.state.userImage ? this.state.userImage : "/images/logoplaceholder.png"} class="personal-avatar" alt="avatar" />
                                </figure>
                            </label>
                        </div>
                    </div>
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
            <Route path="/user/profile/products" render={() => <UserProducts products={this.state.products} favIds={this.state.favIds} feedback={this.state.feedback} onProductSelect={this.props.onProductSelect} />} />
            <Route path="/user/profile/favorites" render={() => <Favorites products={this.state.favIds} feedback={this.state.feedback} onProductSelect={this.props.onProductSelect} onFavClick={this.handleRetrieveProducts} />} />
        </section>
    }
}

export default withRouter(UserProfile)