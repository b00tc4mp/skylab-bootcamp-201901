import React from 'react'


function Results(items) {


    return <ul>
        {
           items.map(({ name, image, id }) => {
                return <li key={id}>
                    <h2>{name}</h2>
                    <img src={image} />
                    <span>{id}</span>
                </li>
            })
        }
     </ul>
}

export default Results        