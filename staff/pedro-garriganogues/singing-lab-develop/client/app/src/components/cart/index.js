import React, { Component } from 'react'
import Footer from '../footer'
import './index.css'
import { Link } from 'react-router-dom'
import swal from 'sweetalert2'

class Cart extends Component {

    render() {

        this.props.cart.map(item => this.props.total.push(item.price))

        return (
            <main>
                <section className="main-title my-cart-title">
                    <div className="flying-cart-title"> My Cart</div>
                    <i className="fas fa-shopping-cart title-shopping-cart"></i>
                </section>
                <section className="main-section-cart">
        
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Course</th>
                            <th scope="col">Units available</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cart.map(item => (
                            <tr key={item._id}>
                                <td width="10%"><img className="card-img-top cart-image" src={item.image} alt="course or category" /></td>
                                <td> <h5 className="card-title">{item.name}</h5></td>
                                <td>{item.stock}</td>
                                <td>{item.discount}%</td>
                                <td> <h5 className="card-title">{item.price} €</h5></td>
                                {/* <td><a className="btn btn-outline-secondary" onClick={() => this.onRemoveFromCart(item._id)} role="button">Remove from cart</a></td> */}
                                <td><a className="btn btn-outline-secondary" onClick={() => this.props.onRemoveFromCart(item._id)} role="button">Remove from cart</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {<div className="card text-right total-price-card">
                    <div className="card-body">
                    <h2>Total price</h2>
                        <h2 className="card-title">{this.props.total.length && this.props.total.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}€</h2>
                        {this.props.loggedIn ? <Link to="/order" className="btn btn-outline-secondary" role="button">Buy the products</Link> : <a onClick={() => swal('You must be logged to purchase our products')} className="btn btn-outline-secondary" role="button">Buy the products</a> }
                    </div>
                </div>}
                </section>
                <Footer />
            </main>
        )
    }
}

export default Cart