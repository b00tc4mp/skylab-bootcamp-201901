import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import logic from '../../logic'

class Cart extends Component {

    render() {


        return (
            <section>
                <section>
                    <h1 clasName="title">Cart:</h1>
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
                                    <td><button onClick={() => logic.removeProductFromCart()}>Remove</button></td>
                                </tr>
                            ))}
                        </div>
                    </table>
                    {<div>
                        <div>
                            <h2>Total price</h2>
                            {logic.__userApiProducts__ && <h2>{logic.__userApiProducts__.reduce((accumulated, currentValue) => accumulated + currentValue.price, 0)}€</h2>}
                            {logic.__userApiToken__ && <button><Link className="decoration" to="/">Comprar</Link> </button>}
                            {!logic.__userApiToken__ && <button><Link className="decoration" to="/register">Registrate para comprar!</Link>   </button>}
                        </div>
                    </div>}
                </section>
            </section>
        )
    }
}

export default Cart