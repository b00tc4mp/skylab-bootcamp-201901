import React, { Component } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import './index.sass'
import { withRouter } from 'react-router-dom'

class Product extends Component {

    state = { fav: false, userProduct: false}

    onFav = id => {

        if(logic.isUserLoggedIn){
            try {
                return logic.toogleFav(id)
                    .then(fav => {
                        this.setState({ fav })
                        if(this.props.onFavClick)this.props.onFavClick()
                    })
            } catch (error) {
    
            }
        }else{
            this.props.history.push('/login')
        }
    }

    handleProductSelect = id => {

        this.props.onProductSelect(id)
    }

    onMatchWithUserProducts = () => {
        try {
            if(logic.isUserLoggedIn){
                return logic.retrieveUserProducts()
                    .then(userProducts =>{
                        const index = userProducts.findIndex(({id}) => id == this.props.id)
                        if(index >=0) this.setState({userProduct: true})
                    })
            }
        } catch (error) {
            
        }
    }

    componentDidMount(){
        const index = this.props.idFav.findIndex(({ id }) => id == this.props.id)
        if (index >= 0) this.setState({ fav: true })

        this.onMatchWithUserProducts()
    }


    componentWillReceiveProps(products) {
        const index = products.idFav.findIndex(({ id }) => id == this.props.id)
        if (index >= 0) this.setState({ fav: true })
    }

    render() {

        const { props: { id, tittle, description, price, sold, imageUrl }, handleProductSelect, onFav, state: { fav } } = this

        return <section className="products">
            <div className="product" key={id} onClick={() => handleProductSelect(id)}>
                <div className="product__imgcontainer">
                    <img className="product__img" src={imageUrl} />
                </div>
                <div className="product__content">
                    <p className="product__price">{price} €</p>
                    <p className="product__tittle">{tittle}</p>
                    <p className="product__description">{description.length < 50 ? description.substr(0, 50) : description.substr(0, 50)+"...."}</p>
                </div>
                {sold && <img src="images/sold.png" className="product__sold"></img>}
                {!this.state.userProduct && <div className="product__btncontainer" onClick={event => [onFav(id), event.stopPropagation()]}>
                    <button className="product__btn">
                        <i className={fav ? "fas fa-heart product__logo" : "far fa-heart product__logo"}></i>
                    </button>
                </div>}
            </div>
        </section>
    }
}

export default withRouter(Product)