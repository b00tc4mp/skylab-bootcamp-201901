import React from 'react'



function Favorites({ favs, giveFav }) {




    return  <>
    <button onClick={() => giveFav()}>favs</button>
    <ul>
           
            {

                favs.map(({ strDrink, strDrinkThumb, strIngredient1}) => {

                    return <li>
                        <h2>{strDrink}</h2>
                        <img src={strDrinkThumb} />
                        <span>{strIngredient1}</span>
                    </li>
                })


            }
        </ul>  

        </>      
}




export default Favorites