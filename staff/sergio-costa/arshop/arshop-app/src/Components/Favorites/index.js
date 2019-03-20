import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import logic from '../../logic'
import Feedback from '../Feedback'
import Product from '../Product'
import './index.sass'

class Favorites extends Component {

    state = { products: [] }

    componentWillReceiveProps(props) {
        this.setState({ products: props.products })
    }

    componentDidMount() {
        this.setState({ products: this.props.products })
    }

    render() {
        const { props: { feedback }, state: { products } } = this

        return <section className="favorites">
            {feedback && <Feedback message={feedback} />}
                {products && products.map(({ id, tittle, description, price, imageUrl, sold }) => {
                    return <Product key={id} id={id} tittle={tittle} description={description} price={price} imageUrl={imageUrl} sold={sold} idFav={products} onProductSelect={this.props.onProductSelect} onFavClick={this.props.onFavClick} />
                })}
        </section>
    }
}
export default withRouter(Favorites)