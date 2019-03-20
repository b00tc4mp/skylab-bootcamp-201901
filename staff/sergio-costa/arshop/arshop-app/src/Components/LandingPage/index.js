import React, { Component } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'
import Header from '../Header'
import './index.sass'
import Product from '../Product';

class LandingPage extends Component {

    state = { products: [], feedback: null, favIds: [] }

    componentDidMount() {

        try {
            logic.retrieveProducts()
                .then(products => {
                    this.setState({ products })
                })
                .then(() => {
                    if (logic.isUserLoggedIn) {
                        logic.retrieveFavs()
                            .then(favIds => this.setState({ favIds }))
                    }
                })
                .catch(({ message }) => {
                    this.setState({ feedback: message })
                })
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {

        const { state: { feedback, products } } = this


        return <section className="landingPage">
            {feedback && <Feedback message={feedback} />}
            {products && products.map(({ id, tittle, description, price, imageUrl, sold }) => {
                return <Product key={id} id={id} tittle={tittle} description={description} price={price} imageUrl={imageUrl} sold={sold} idFav={this.state.favIds} onProductSelect={this.props.onProductSelect} />
            })}
        </section>
    }
}
export default LandingPage