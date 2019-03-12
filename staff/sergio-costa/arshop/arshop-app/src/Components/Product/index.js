import React, { Component } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import './index.sass'

class Product extends Component {

    state = { fav: false }

    // onProductSelect(id){
    //     console.log(id)
    // }       

    onFav = id => {
        
        try {
            logic.toogleFav(id)
                .then(fav => this.setState({ fav }))
                .then(() => console.log(this.state.fav))
        } catch (error) {

        }
    }

    render() {

        const { props: { id, tittle, description, price, imageUrl }, onProductSelect, onFav, state: { fav } } = this

        return <section className="products">
            <div className="product" key={id} onClick={() => onProductSelect(id)}>
                <div className="product__imgcontainer">
                    <img className="product__img" src={imageUrl} />
                </div>
                <div className="product__content">
                    <p className="product__price">{price} €</p>
                    <p className="product__tittle">{tittle}</p>
                    <p className="product__description">{description}</p>
                </div>
                <div className="product__btncontainer" onClick={event => [onFav(id), event.stopPropagation()]}>
                    <button className="product__btn">
                        <i className={fav ? "fas fa-heart product__logo" : "far fa-heart product__logo"}></i>
                    </button>
                </div>
            </div>
        </section>
    }
}

export default Product