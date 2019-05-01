import React from 'react'
import logic from '../../logic';

function SmallCard({ toPaint, onItem }) {

    // recibe un array y devuelve el mismo array mezclando 
    // en orden aleatorio sus elementos
    function shuffle(a, newLen) {
        let j, x, i
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1))
            x = a[i]
            a[i] = a[j]
            a[j] = x
        }
        a.length = newLen
    }
    
    // sólo llamamos a shuffle si toPaint !== null && su longitud es mayor que 5
    if ((toPaint) && (toPaint.length > 5)) shuffle(toPaint, 5)
    

    return <div className="results">
        {
          toPaint && toPaint.map(({ idMeal: id, strMeal: title, strMealThumb: img }) => {
                return <span key={id} onClick={() => onItem(id)}>
                    <img src={img} />
                    <h4>{title}</h4> 
                </span>
            })
        }
    </div>
}

export default SmallCard