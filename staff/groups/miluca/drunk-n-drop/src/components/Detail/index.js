import React from 'react'


function Detail({ detail }) {


    const {id,name,image,instructions,glass,ingredients} = detail
    console.log(ingredients)
    return <>
        <ul>
            <li key={id}>
                <h2>{name}</h2>
                <img src={image} />
                <span>{instructions}</span>
                <span>{glass}</span>
                
            </li>
            <ul> 
            {
                
                ingredients && ingredients.map(({measure , image ,ingredientName})=>{
                    return <li>
                    <p>{ingredientName}</p>
                    <img src={image}/>
                    <p>{measure}</p>
                    </li>
                            
                })
            }
                
            </ul>
        </ul>

    </>
    

}

export default Detail