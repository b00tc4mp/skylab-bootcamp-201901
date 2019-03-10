import React, { Component } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

class Aside extends Component {

    goToUploadProduct = () => {
        if(logic.isUserLoggedIn) this.props.history.push(`/upload/product`)
        else this.props.history.push('/login')
    }

    goToMyProfile = () => {
        if(logic.isUserLoggedIn) this.props.history.push(`/profile/info`)
        else this.props.history.push('/login')
    }

    goToMyProducts = () => {
        if(logic.isUserLoggedIn) this.props.history.push(`/user/products`)
        else this.props.history.push('/login')
    }

    goToFavorites = () => {
        if(logic.isUserLoggedIn) this.props.history.push('/favorites')
        else this.props.history.push('/login')
    }

    render() {
        return <aside className="aside">
            <div className="aside__user">
                <i className="fas fa-user"></i>
                <p className="aside__user-text">USERNAME</p>
            </div>
            <div className="aside__divbtn">
                <button className="aside__btn" onClick={() => this.goToUploadProduct()}>
                    <i className="fas fa-plus-circle"></i>
                    <p>Upload Product</p>
                </button>
            </div>
            <ul className="aside__list">
                <li onClick={() => this.goToMyProfile()}>My Profile</li>
                <li onClick={() => this.goToMyProducts()}>My Products</li>
                <li onClick={() => this.goToFavorites()}>Favorites</li>
            </ul>
        </aside>
    }
}

export default withRouter(Aside)