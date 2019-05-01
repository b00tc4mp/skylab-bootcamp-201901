import React from 'react'



function Populars({ pops, givePop,onFavorites,onDetail }) {

    return <>
        <button onClick={() => givePop()}>pops</button>
        <ul>
            {
                pops.map(({ name, image, id }) => {


                    return <li key={id}>
                        <h2>{name}</h2>
                        <img src={image} onClick={() => onDetail(id)}/>
                        <button onClick={() => onFavorites(id)}>add</button>

                    </li>
                })


            }
        </ul>

    </>
}




export default Populars