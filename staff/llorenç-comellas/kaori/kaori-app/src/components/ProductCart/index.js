import React from 'react'
import StripePayament from '../StripePayament'
import './index.scss'

function ProductCart({ items, deleteCart, onTokenSucces }) {
    let cost = 0
    return <>
        <section className="cart" >
            {!items[0] && <p>No hay productos en la cesta</p>}

            <ul className="">
                {
                    items && items.map(({ product, quantity }) => {
                        cost += product.price * quantity
                       
                        return <>
                            <li key={product.id} className="" >
                                <div className="columns is-mobile">
                                    <div className=" column is-5">
                                        <h2>{product.title}</h2>
                                        <img src={product.image} alt="sushi" />
                                    </div>

                                    <div className="column is-7">
                                        <p>{'Cantidad: ' + quantity}</p>
                                        <p>{quantity * product.price + '€'}</p>
                                        <span className="icon">
                                            <i className="fas fa-trash-alt" onClick={() => deleteCart(product.id)}></i>
                                        </span>
                                    </div>
                                </div>
                                <hr></hr>
                            </li>
                        </>
                    })
                }
            </ul>
            {items[0] && <p>TOTAL: <strong>{cost.toFixed(2) + '€'}</strong></p>}
            {items[0] && <StripePayament onTokenSucces={onTokenSucces} cost={cost} />}
        </section>
    </>

}



export default ProductCart