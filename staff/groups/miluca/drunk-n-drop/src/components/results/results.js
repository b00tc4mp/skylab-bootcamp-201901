import React from 'react'


function Results({items,onFavorites, onDetail}) {



    return <ul>
        {
    
        items.map(({name,image,id})=>{

            return <li key={id}>
                <h2>{name}</h2>
                <img src={image} onClick={() => onDetail(id)}/>
                <button onClick={() => onFavorites(id)}>add</button>
                
            </li>
        })

       
        }
         </ul>
      
}

export default Results        