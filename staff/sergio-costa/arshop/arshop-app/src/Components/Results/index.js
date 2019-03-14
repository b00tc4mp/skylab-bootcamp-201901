import React, { Component } from 'react'
import Feedback from '../Feedback'
import Product from '../Product'
import logic from '../../logic'

class Results extends Component {

    state = { products: [], feedback: null, favIds: [] }

    componentDidMount() {

        const { props:{ query } } = this

        this.handleSearch(query)
    }

    componentWillReceiveProps(props){

        const { query } = props

        this.handleSearch(query)
    }

    handleSearch = (query) => {
        try {
            const q = this.props.query
            logic.searchProducts(query)
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
            {products.map(({ id, tittle, description, price, imageUrl, sold }) => {
                return <Product key={id} id={id} tittle={tittle} description={description} price={price} imageUrl={imageUrl} sold={sold} idFav={this.state.favIds} onProductSelect={this.props.onProductSelect} />
            })}
        </section>
    }
}

export default Results