import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import logic from '../../logic'

class Cart extends Component {

    render() {


        return (
            <section>
                <h1 className="title">Cart:</h1>
                <section className="globalsection">
                    <section className="sectioncart">
                        <table>
                            <head>
                            </head>
                            <div>
                                {!logic.__userApiProducts__ && <p>Cart is empty!</p>}
                                {logic.getCart().map(item => (
                                    <tr className="box" key={item._id}>
                                        <td ><img className="cartImage" src={item.image} alt="404" /></td>
                                        <td> <h4>{item.name}</h4></td>
                                        <td> <h4>{item.price} €</h4></td>
                                    </tr>
                                ))}
                            </div>
                        </table>
                        {<div className="pricebuttons">
                            <div className="totalPrice">
                                <h2>Total price</h2>
                                {logic.__userApiProducts__ && <h2>{logic.__userApiProducts__.reduce((accumulated, currentValue) => accumulated + currentValue.price, 0)}€</h2>}
                            </div>
                            <div className="buttons2">
                                {logic.__userApiProducts__ && logic.__userApiToken__ && <button><Link className="decoration" to="/order">Comprar</Link> </button>}
                                <br />
                                {!logic.__userApiToken__ && <button><Link className="decoration" to="/register">Registrate para comprar!</Link>   </button>}
                                <br />
                                <button className="decoratonxº" onClick={() => logic.removeProductFromCart()}>Clear Cart</button>
                            </div>
                        </div>}
                    </section>
                </section>
            </section>
        )
    }
}

export default Cart