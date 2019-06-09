import React from 'react'
import logic from '../../logic';
import './index.scss'

function Category({ products, onLogin, addCart }) {

    return <>
        <section className="category" onClick={e => e.preventDefault()}>
            {!logic.isUserLoggedIn && <p>Para añadir productos tienes que <a href="" onClick={() => onLogin()}><strong>Inicar sesión</strong></a></p>}
            <ul className="">
                {/* <p>{error}</p> */}
                {
                    products.map(({ id, title, description, image, price }) => {
                        return <>

                            <li key={id} className="" >
                                <div class="columns is-mobile">
                                    <div class="image-padding column ">
                                        <img src={image} />
                                        <p className='price' >{price + '€'}</p>
                                    </div>
                                    <div class="column is-three-fifths-mobile">
                                        <h2>{title}</h2>
                                        <p>{description}</p>
                                        {logic.isUserLoggedIn && <button className="button" onClick={() => addCart(id)}>Añadir</button>}
                                    </div>
                                </div>
                                        <hr></hr>
                            </li>
                        </>
                    })
                }
            </ul>
        </section>
    </>
}
export default Category