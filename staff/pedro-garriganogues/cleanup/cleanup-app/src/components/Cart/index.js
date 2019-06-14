import React, { Component } from 'react'
import './index.sass'
import { Link } from 'react-router-dom'
import logic from '../../logic'

class Cart extends Component {

    render() {


        return (
            <section>
                {logic.__userApiProducts__ && <h1 className="title" >Cart:</h1>}
                {!logic.__userApiProducts__ && <h1 className="title" >Cart is empty!</h1>}
                <section className="globalsection">
                    <div className="displayflexcart">
                        <table>
                            <div>
                                {logic.getCart().map(item => (
                                    <tr className="box" key={item._id}>
                                        <td> <h4>{item.name}</h4></td>
                                        <td> <h4>{item.price} €</h4></td>
                                    </tr>
                                ))}
                            </div>
                        </table>
                        {<div className="pricebuttons">
                            <div className="totalPrice">
                                <h2>Total price</h2>
                                {logic.__userApiProducts__ && <h2>{logic.__userApiProducts__.reduce((accumulated, currentValue) => accumulated + currentValue.price, 0).toFixed(2)}€</h2>}
                            </div>
                            <div className="buttons2">
                                {logic.__userApiProducts__ && logic.__userApiToken__ && <button className="buttoncart"><Link className="notext" to="/order">Comprar</Link> </button>}
                                <br />
                                {!logic.__userApiToken__ && <button className="buttoncart" ><Link className="notext" to="/register">Registrate para comprar!</Link>   </button>}
                                <br />
                                <button className="buttoncart" onClick={() => logic.removeProductFromCart()}>Clear Cart</button>
                            </div>
                        </div>}
                    </div>
                </section>
            </section>
        )
    }
}

export default Cart