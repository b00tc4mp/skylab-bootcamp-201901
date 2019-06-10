import React from 'react'
import StripePayament from '../StripePayament'
import './index.scss'

function ProductCart({ items, deleteCart }) {

    
    return <>
        <section className="cart" >
            {!items[0] && <p>No hay productos en la cesta</p>}

            <ul className="">
                {/* <p>{error}</p> */}
                {
                    items && items.map(({ product, quantity }) => {
                        return <>
                            <li key={product.id} className="" >
                                <div className="columns is-mobile">
                                    <div className=" column is-5">
                                        <h2>{product.title}</h2>
                                        <img src={product.image} />
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
            {items[0] && <p>TOTAL:{items.quantity}</p>}
            {/* {items[0] && <StripePayament onTokenSucces={handlePurchase}/>} */}
        </section>
    </>

}



export default ProductCart