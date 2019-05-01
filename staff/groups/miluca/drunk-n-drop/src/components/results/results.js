import React from 'react'


function Results({items,onFavorites}) {

    console.log(items)


    return '' /* <ul>
        {
    
        items.map(({strDrink,strDrinkThumb,strIngredient1,idDrink})=>{

            return <li key={idDrink} onClick={() => onFavorites(idDrink)}>
                <h2>{strDrink}</h2>
                <img src={strDrinkThumb}/>
                <span>{strIngredient1}</span>
                <span></span>
            </li>
        })

       
        }
         </ul> */
      
}

export default Results        