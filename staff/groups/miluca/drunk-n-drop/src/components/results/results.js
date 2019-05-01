import React from 'react'


function Results({items,onFavorites}) {



    return <ul>
        {
    
        items.map(({name,image,id})=>{

            return <li key={id} onClick={() => onFavorites(id)}>
                <h2>{name}</h2>
                <img src={image}/>
                
            </li>
        })

       
        }
         </ul>
      
}

export default Results        