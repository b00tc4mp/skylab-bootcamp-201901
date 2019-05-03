import React from 'react'
import './index.sass'



function Populars({ pops, onFavorites,onDetail }) {

    

    return <>
    <div class="container-fluid container_background ">
        <ul class="columns is-multiline is-mobile is-centered">
            {
            pops.map(({name,image,id})=>{
                return <li class="column is-2-desktop is-5-tablet is-6-mobile" key={id}>
                    <div class="box box_background">

                        <h2 class="boxcentered">{name}</h2>
                        <img class="cocktail_images" src={image} onClick={() => onDetail(id)}/>
                        
                    </div>
                </li>
            })

        
            }
        </ul>
    </div>
   
    </>
}

export default Populars