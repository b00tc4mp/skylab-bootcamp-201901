import React from 'react'



function Favorites({ favs, giveFav ,onDetail}) {

        
    return  <>
    <button onClick={() => giveFav()}>favs</button>
    <ul>
           
            {

                favs.map(({ name, image, id}) => {
                    

                    return <li key={id}>
                        <h2>{name}</h2>
                        <img src={image} onClick={() => onDetail(id)}/>
                       
                    </li>
                })


            }
        </ul>  

        </>      
}




export default Favorites