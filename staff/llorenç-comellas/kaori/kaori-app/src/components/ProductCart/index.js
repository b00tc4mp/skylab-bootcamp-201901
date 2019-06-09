import React from 'react'

function ProductCart({items, deleteCart}){
    
    return <>
    <section className="" >
   
        <ul className="">
            {/* <p>{error}</p> */}
            {
                items && items.map(({ product, quantity }) => {
                    
                    return <>
                        <li  className="" >
                            <p>{product.title}</p>
                            <p>{product.description}</p>
                            <img src={product.image} />
                            <p>{quantity}</p>
                            <p>{quantity * product.price  + '€'}</p>
                            <button onClick={()=> deleteCart(product.id)}>Eliminar</button>
                        </li>
                    </>
                })
            }
        </ul>
    </section>
</>

}

export default ProductCart