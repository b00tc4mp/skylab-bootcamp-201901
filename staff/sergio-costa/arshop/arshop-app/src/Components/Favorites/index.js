import React, { Component } from 'react'
import logic from '../../logic'
import Feedback from '../Feedback'

class Favorites extends Component {

    state = { products: [], feedback: null }

    componentDidMount() {
        try {
            logic.retrieveFavs()
                .then(products => {
                    this.setState({ products })
                    console.log(this.state.products)
                })
                .catch(({ message }) => {
                    this.setState({ feedback: message })
                })
        } catch ({ message }) {
            this.setState({ feedback: message })
        }
    }

    render() {

        const { state: { feedback, products }, onProductSelect } = this


        return <section>
            {feedback && <Feedback message={feedback} />}
            <div>
                {products.map(({id, tittle, description, price, sold}) => {
                    return <div key={id} onClick={() => onProductSelect(id)}>
                        <div>
                            {/* image */}
                        </div>
                        <h3>{tittle}</h3>
                        <p>{description}</p>
                        <p>{price}</p>
                    </div>
                })}
            </div>
        </section>
    }
}
export default Favorites