import React from 'react'



function Favorites({ favs, giveFav }) {


    return  <>
    <button onClick={() => giveFav()}>favs</button>
    <ul>
           
            {

                favs.map(({ name, image}) => {
                    

                    return <li>
                        <h2>{name}</h2>
                        <img src={image} />
                       
                    </li>
                })


            }
        </ul>  

        </>      
}




export default Favorites