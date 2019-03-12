import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import logic from '../../logic'

class Cart extends Component {

    render() {


        return (
            <main>
                <section>
                    <h1 clasName="title">Cart:</h1>
                    <i></i>
                </section>
                <section>

                    <table>
                        <head>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Course</th>
                                <th scope="col">Price</th>
                                <th scope="col"></th>
                            </tr>
                        </head>
                        <div>
                            {logic.getCart().map(item => (
                                <tr className="box" key={item._id}>
                                    <td ><img className="cartImage" src={item.image} alt="404" /></td>
                                    <td> <h4>{item.name}</h4></td>
                                    <td> <h4>{item.price} €</h4></td>
                                    <td><a onClick={() => this.props.onRemoveFromCart(item._id)}>Remove</a></td>
                                </tr>
                            ))}
                        </div>
                    </table>
                    {<div>
                        <div>
                            <h2>Total price</h2>
                            <h2>{logic.__userApiProducts__.reduce((accumulated, currentValue) => accumulated + currentValue.price, 0)}€</h2>
                            {logic.__userApiToken__ && <Link to="/">Checkout</Link>}
                        </div>
                    </div>}
                </section>
            </main>
        )
    }
}

export default Cart